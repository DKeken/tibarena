import { Strategy } from "passport-custom";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Request } from "express";
import { db } from "@repo/database/db";
import { authMessages, AuthMessageStatus } from "@repo/database/schema";
import { eq } from "@repo/database";
import { firstValueFrom } from "rxjs";

interface EthereumAuthPayload {
  address: string;
}

@Injectable()
export class EthereumStrategy extends PassportStrategy(Strategy, "ethereum") {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<EthereumAuthPayload> {
    if (!req.body) {
      throw new UnauthorizedException("Invalid request body");
    }

    console.log("Request body:", req.body);

    const { address, signature, message } = req.body;
    console.log("Request body:", {
      address,
      signature: signature?.slice(0, 10) + "...",
      message: message ? "provided" : "missing",
    });

    if (!address || !signature) {
      throw new UnauthorizedException("Missing address or signature");
    }

    // If message is not provided, fetch the nonce and construct the message
    let verificationMessage = message;
    if (!verificationMessage) {
      console.log("Getting nonce for address:", address);
      const nonce = await firstValueFrom(this.authService.getNonce(address));
      if (!nonce) {
        throw new UnauthorizedException(
          "Nonce not found. Request a new challenge.",
        );
      }
      verificationMessage = `Sign in with Ethereum: ${nonce}`;
    }

    console.log("Verifying signature with message:", verificationMessage);
    const isValid = await firstValueFrom(
      this.authService.verifySignature(address, signature, verificationMessage),
    );
    console.log("Signature verification result:", isValid);

    if (!isValid) {
      throw new UnauthorizedException("Invalid signature");
    }

    console.log("Updating auth message status to USED");
    await db
      .update(authMessages)
      .set({ status: AuthMessageStatus.USED })
      .where(eq(authMessages.walletAddress, address.toLowerCase()));

    console.log("Validation successful for address:", address);
    return { address };
  }
}
