import { LogLevel } from "@nestjs/common";

export const loggerConfig = {
  LEVELS: ["error", "warn", "log", "debug", "verbose"] as LogLevel[],
};
