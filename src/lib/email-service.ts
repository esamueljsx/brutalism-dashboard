import type { EmailResponse, EmailFilters, Email } from "../types";
import { tokenHelpers } from "../utils/auth";

const BASE_API_URL = "https://email-list-api-4.onrender.com";

export const emailService = {
  //  Fetch emails with filters
  async getEmails(filters: EmailFilters = {}): Promise<EmailResponse> {
    const token = tokenHelpers.getToken();
    if (!token) {
      throw new Error("Unauthorized");
    }

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.view) params.append("view", filters.view);
      if (filters.search) params.append("search", filters.search);
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.limit) params.append("limit", filters.limit.toString());
      if (filters.labels && filters.labels.length > 0) {
        params.append("labels", filters.labels.join(","));
      }

      const response = await fetch(
        `${BASE_API_URL}/api/emails?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Get response text first
      const text = await response.text();

      // Try to parse JSON
      let data: EmailResponse & { message?: string };
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch emails");
      }

      return data;
    } catch (error) {
      console.error("Get emails error:", error);
      throw error;
    }
  },

  //  Toggle email star status
  async toggleStar(emailId: string): Promise<Email> {
    const token = tokenHelpers.getToken();
    if (!token) {
      throw new Error("Unauthorized");
    }

    try {
      const response = await fetch(
        `${BASE_API_URL}/api/emails/${emailId}/star`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const text = await response.text();
      let data: { data: Email; message?: string };

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to toggle star");
      }

      return data.data;
    } catch (error) {
      console.error("Toggle star error:", error);
      throw error;
    }
  },

  // Email counts for sidebar badges
  async getEmailCounts(): Promise<{
    inbox: number;
    starred: number;
    important: number;
    unread: number;
    drafts: number;
    sent: number; 
  }> {
    const token = tokenHelpers.getToken();
    if (!token) {
      throw new Error("Unauthorized");
    }

    try {
      const response = await fetch(`${BASE_API_URL}/api/emails/counts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const text = await response.text();
      let data: {
        data: {
          inbox: number;
          starred: number;
          important: number;
          unread: number;
          drafts: number;
          sent: number; 
        };
        message?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch email counts");
      }

      return data.data;
    } catch (error) {
      console.error("Get email counts error:", error);
      throw error;
    }
  },
};
