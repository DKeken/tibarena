/* eslint-disable turbo/no-undeclared-env-vars */

export const corsConfig = {
  ORIGIN: process.env.CORS_ORIGIN || "*",
  METHODS: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  CREDENTIALS: true,
};
