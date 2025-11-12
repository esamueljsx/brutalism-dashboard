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

// Email types
export interface EmailAttachment {
  id: string;
  email_id: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  created_at: string;
}

export interface Email {
  id: string;
  userId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  hasAttachments: boolean;
  attachments: EmailAttachment[];
  labels: string[];
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailResponse {
  success: boolean;
  data: Email[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type EmailView =
  | "inbox"
  | "starred"
  | "important"
  | "unread"
  | "sent"
  | "drafts"
  | "trash";

export interface EmailFilters {
  view?: EmailView;
  labels?: string[];
  search?: string;
  page?: number;
  limit?: number;
}
