import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const apiClient = axios.create({
  baseURL: "https://email-list-api-3.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || error.message;
      throw new Error(message);
    } else if (error.request) {
      throw new Error("No response from server. Please check your connection.");
    } else {
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
);

// React Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});
