import type { AuthResponse, LoginCredentials, User } from "../types";
import { tokenHelpers } from "../utils/auth";

// Mock user database
const MOCK_USERS = [
  {
    id: "2",
    email: "user@habaripay.com",
    password: "user123",
    name: "Ari budin",
    avatar: "https://brutalism.tailwinddashboard.com/src/img/avatar/male3.jpg",
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(800); // Simulate network request

    const user = MOCK_USERS.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const token = btoa(`${user.email}:${Date.now()}`); // Simple mock token
    const userData: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };

    tokenHelpers.setToken(token);
    tokenHelpers.setUser(userData);

    return { user: userData, token };
  },

  async logout(): Promise<void> {
    await delay(300);
    tokenHelpers.clearAuth();
  },

  async validateToken(): Promise<User | null> {
    await delay(300);
    const token = tokenHelpers.getToken();
    const user = tokenHelpers.getUser<User>();

    if (!token || !user) {
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
