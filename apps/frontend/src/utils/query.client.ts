import { QueryClient } from "@tanstack/react-query";

/**
 * Singleton pattern for QueryClient with improved configuration
 * This ensures consistent caching and state management across the application
 */
let queryClientInstance: QueryClient | null = null;

export const createQueryClient = (): QueryClient => {
  if (!queryClientInstance) {
    queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          retry: 1,
          refetchOnWindowFocus: false,
        },
        mutations: {
          retry: 1,
        },
      },
    });
  }
  return queryClientInstance;
};
