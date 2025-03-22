"use client";

import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { createSiweMessage } from "viem/siwe";
import {
  authControllerGetNonce,
  authControllerLogin,
  authControllerLogout,
  UserResponseDto,
} from "@repo/queries";

interface AuthAdapter {
  getNonce: () => Promise<string>;
  createMessage: (args: {
    nonce: string;
    address: `0x${string}`;
    chainId: number;
  }) => string;
  verify: (args: { message: string; signature: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
}

// Function to get the current user from local storage
export function getCurrentUser(): UserResponseDto | null {
  if (typeof window === "undefined") return null;

  try {
    const authData = localStorage.getItem("authUser");
    if (!authData) return null;

    return JSON.parse(authData) as UserResponseDto;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

// Function to set user data in local storage
export function setCurrentUser(user: Partial<UserResponseDto>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("authUser", JSON.stringify(user));
}

// Function to clear user data from local storage
export function clearCurrentUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authUser");
}

// Function to check if user is authenticated
export function isAuthenticated(): boolean {
  const user = getCurrentUser();
  return !!user;
}

export const createAuthAdapter = (
  setAuthStatus: (status: "authenticated" | "unauthenticated") => void,
  address: string,
): AuthAdapter => {
  return createAuthenticationAdapter({
    getNonce: async () => {
      const walletAddress =
        address || localStorage.getItem("walletAddress") || "";

      const response = await authControllerGetNonce({
        address: walletAddress,
      });

      if (!response.success) {
        throw new Error("Failed to get nonce");
      }

      return response.nonce;
    },

    createMessage: ({ nonce, address, chainId }) => {
      const message = createSiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });

      return message;
    },

    verify: async ({ signature, message }) => {
      try {
        const walletAddress =
          address || localStorage.getItem("walletAddress") || "";

        const response = await authControllerLogin({
          address: walletAddress,
          signature,
          message,
        });

        if (response.success && response.user) {
          setCurrentUser(response.user);
          console.log("response.user", response.user);
          setAuthStatus("authenticated");

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error during verification:", error);
        return false;
      }
    },

    signOut: async () => {
      const response = await authControllerLogout();

      if (response.success) {
        clearCurrentUser();
        localStorage.removeItem("walletAddress");
        setAuthStatus("unauthenticated");
      } else {
        console.error("Logout failed:", response);
      }
    },
  });
};
