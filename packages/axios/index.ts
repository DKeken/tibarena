import axios from "axios";
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const isSSR = typeof window === "undefined";

// Define types expected by @kubb/plugin-client
export type RequestConfig<TData = unknown> = {
  url?: string;
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
  params?: unknown;
  data?: TData;
  responseType?:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";
  signal?: AbortSignal;
  headers?: AxiosRequestConfig["headers"];
};

export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
  headers?: AxiosResponse["headers"];
};

export type ResponseErrorConfig<TError = unknown> = {
  error: TError;
  status?: number;
  statusText?: string;
  headers?: AxiosResponse["headers"];
};

class AxiosClient {
  private static instance: AxiosClient;
  private readonly axiosInstance: AxiosInstance;

  private constructor() {
    const baseURL = this.resolveBaseURL();

    const config: AxiosRequestConfig = {
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    // Only add httpsAgent in Node.js environment
    if (typeof process !== "undefined" && typeof require !== "undefined") {
      try {
        const https = require("https");
        config.httpsAgent = new https.Agent({ rejectUnauthorized: false });
      } catch (error) {
        console.warn("HTTPS Agent could not be initialized:", error);
      }
    }

    this.axiosInstance = axios.create(config);

    this.setupInterceptors();
  }

  private resolveBaseURL(): string {
    // Default fallback URL
    let baseURL = "http://localhost:3333";

    // Next.js/Node environment
    if (typeof process !== "undefined" && process.env?.BACKEND_URL) {
      return process.env.BACKEND_URL;
    }

    return baseURL;
  }

  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
    }
    return AxiosClient.instance;
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status;
          const errorMessages: Record<number, string> = {
            401: "Unauthorized access",
            403: "Forbidden access",
            500: "Server error",
          };

          if (status in errorMessages) {
            // Don't log errors in client-side to avoid console pollution
            if (isSSR) {
              console.error(errorMessages[status]);
            }
          }
        } else if (error.request) {
          if (isSSR) {
            console.error("No response received:", error.request);
          }
        } else {
          if (isSSR) {
            console.error("Error:", error.message);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public async request<TData, TError = unknown, TVariables = unknown>(
    config: RequestConfig<TVariables>
  ): Promise<ResponseConfig<TData>> {
    try {
      const response = await this.axiosInstance.request<
        TVariables,
        AxiosResponse<TData>
      >({
        ...config,
      });

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      // Handle 401 errors gracefully
      if (error instanceof AxiosError && error.response?.status === 401) {
        // Return a default response for unauthorized errors
        return {
          data: {} as TData,
          status: 401,
          statusText: "Unauthorized",
          headers: error.response.headers,
        };
      }

      // For other errors, rethrow
      throw error as AxiosError<TError>;
    }
  }
}

// Export a singleton instance of the client function
const client = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  return AxiosClient.getInstance().request<TData, TError, TVariables>(config);
};

export default client;
