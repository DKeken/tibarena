import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import type { UserConfig } from "@kubb/core";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../../.env" });

export default defineConfig({
  root: ".",
  input: {
    path: "./output.swagger.json",
  },
  output: {
    path: "./src/generated",
    clean: true,
  },
  hooks: {
    done: ['prettier --write "src/generated/**/*.{ts,tsx}" --loglevel silent'],
  },
  plugins: [
    pluginOas({
      validate: true,
    }),
    pluginTs({
      output: {
        path: "./models",
      },
    }),
    pluginClient({
      output: {
        path: "./clients",
      },
      client: "axios",
      baseURL: process.env.BACKEND_URL,
      importPath: "@repo/axios",
    }),
    pluginReactQuery({
      output: {
        path: "./hooks",
      },
      query: {
        importPath: "@tanstack/react-query",
      },
      suspense: {},
    }),
  ],
}) as UserConfig;
