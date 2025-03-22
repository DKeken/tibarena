import { serverConfig } from "./server.config";
import { corsConfig } from "./cors.config";
import { swaggerConfig } from "./swagger.config";
import { loggerConfig } from "./logger.config";

export const CONFIG = {
  ...serverConfig,
  CORS: corsConfig,
  SWAGGER: swaggerConfig,
  LOGGER_LEVELS: loggerConfig.LEVELS,
};

console.log("Config loaded:", CONFIG);

export { serverConfig, corsConfig, swaggerConfig, loggerConfig };
