/**
 * Response type for nonce endpoint
 */
export interface NonceResponse {
  success: boolean;
  nonce: string;
}

/**
 * Response type for login endpoint
 */
export interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    walletAddress: string;
    username?: string;
    imageUrl?: string;
  };
}

/**
 * Response type for logout endpoint
 */
export interface LogoutResponse {
  success: boolean;
  message: string;
}

/**
 * User entity interface after authentication
 */
export interface AuthenticatedUser {
  id: string;
  walletAddress: string;
  username?: string;
  imageUrl?: string;
}
