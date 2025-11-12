import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { emailService } from "../lib/email-service";
import type { EmailFilters } from "../types";

// Query keys
export const emailKeys = {
  all: ["emails"] as const,
  lists: () => [...emailKeys.all, "list"] as const,
  list: (filters: EmailFilters) => [...emailKeys.lists(), filters] as const,
  counts: () => [...emailKeys.all, "counts"] as const,
};

// Fetch emails with filters
export function useEmails(filters: EmailFilters = {}) {
  return useQuery({
    queryKey: emailKeys.list(filters),
    queryFn: () => emailService.getEmails(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Fetch email counts
export function useEmailCounts() {
  return useQuery({
    queryKey: emailKeys.counts(),
    queryFn: () => emailService.getEmailCounts(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Toggle star status
export function useToggleStar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (emailId: string) => emailService.toggleStar(emailId),
    onSuccess: () => {
      // Invalidate and refetch emails and counts
      queryClient.invalidateQueries({ queryKey: emailKeys.lists() });
      queryClient.invalidateQueries({ queryKey: emailKeys.counts() });
    },
  });
}
