import type { IconType } from "react-icons/lib";

// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface NavItem {
  name: string;
  href: string;
  icon: IconType;
  hasDropdown?: boolean;
  subItems?: Array<{ name: string; href: string }>;
}

export interface Statistics {
  name: string;
  value: string;
  icon: IconType;
  previous: string;
  progress: string;
  trend: "up" | "down";
}
