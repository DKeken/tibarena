"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { isAuthenticated, createAuthAdapter } from "@/utils/auth.utils";
import { useMount } from "@/hooks/use-mount";
import { RainbowKitAuthenticationProvider } from "@rainbow-me/rainbowkit";
import { useAuthControllerRefreshToken } from "@repo/queries";
import { useQueryClient } from "@tanstack/react-query";

type AuthStatus = "loading" | "unauthenticated" | "authenticated";

interface AuthContextType {
  authStatus: AuthStatus;
  setAuthStatus: (status: AuthStatus) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  onAuthStatusChange?: (status: AuthStatus) => void;
}

export function AuthProvider({
  children,
  onAuthStatusChange,
}: AuthProviderProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: refreshToken } = useAuthControllerRefreshToken();
  const { address, isConnected } = useAccount();
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const isLoading = authStatus === "loading";

  const authenticationAdapter = createAuthAdapter(setAuthStatus, address ?? "");

  // Handle initial authentication check and token refresh
  useMount(() => {
    const checkAuthAndRefresh = async () => {
      const isAuth = isAuthenticated();

      if (isAuth) {
        try {
          await refreshToken(undefined, {
            onError: (error) => {
              console.error("Failed to refresh token:", error);
              setAuthStatus("unauthenticated");
            },
          });
          setAuthStatus("authenticated");
          queryClient.invalidateQueries();
          queryClient.refetchQueries();
        } catch (error) {
          console.error("Failed to refresh token:", error);
          setAuthStatus("unauthenticated");
        }
      } else {
        setAuthStatus("unauthenticated");
      }
    };

    checkAuthAndRefresh();
  });

  // Update parent component when auth status changes
  useEffect(() => {
    onAuthStatusChange?.(authStatus);
  }, [authStatus, onAuthStatusChange]);

  // Store wallet address in localStorage when connected
  useEffect(() => {
    if (isConnected && address) {
      localStorage.setItem("walletAddress", address);
    } else if (!isConnected) {
      localStorage.removeItem("walletAddress");
    }
  }, [address, isConnected]);

  if (!authenticationAdapter) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus, isLoading }}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={authStatus}
      >
        {children}
      </RainbowKitAuthenticationProvider>
    </AuthContext.Provider>
  );
}

export const useAuthStatus = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthStatus must be used within an AuthProvider");
  }

  return context;
};
