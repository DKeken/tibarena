/* eslint-disable turbo/no-undeclared-env-vars */

export const swaggerConfig = {
  TITLE: process.env.SWAGGER_TITLE || "TibArena API",
  DESCRIPTION:
    process.env.SWAGGER_DESCRIPTION || "The TibArena API documentation",
  VERSION: process.env.SWAGGER_VERSION || "1.0",
  PATH: process.env.SWAGGER_PATH || "api/docs",
};
