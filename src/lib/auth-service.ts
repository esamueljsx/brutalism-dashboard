import type { AuthResponse, LoginCredentials, User } from "../types";
import { tokenHelpers } from "../utils/auth";

const BASE_API_URL = import.meta.env.VITE_API_URL;

interface LoginApiResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      avatar: string | null;
      created_at: string;
      updated_at: string;
    };
    token: string;
  };
  message: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
 
      const text = await response.text();
 
      let data: LoginApiResponse;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON response:", text);
        throw new Error(
          "Invalid response from server. Please check your API URL and try again."
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const userData: User = {
        id: data.data.user.id,
        email: data.data.user.email,
        name: data.data.user.name,
        avatar: data.data.user.avatar || undefined,
      };

      tokenHelpers.setToken(data.data.token);
      tokenHelpers.setUser(userData);

      return { user: userData, token: data.data.token };
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred during login");
    }
  },

  async logout(): Promise<void> {
    // Clearing authentication data from cookies
    tokenHelpers.clearAuth();
  },

  async validateToken(): Promise<User | null> {
    // Check if token and user exist in cookies
    const token = tokenHelpers.getToken();
    const user = tokenHelpers.getUser<User>();

    if (!token || !user) {
      tokenHelpers.clearAuth();
      return null;
    }

    return user;
  },

  getStoredToken(): string | null {
    return tokenHelpers.getToken();
  },

  getStoredUser(): User | null {
    return tokenHelpers.getUser<User>();
  },
};
