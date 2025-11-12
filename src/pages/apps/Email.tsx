import { useState } from "react";
import {
  useEmails,
  useEmailCounts,
  useToggleStar,
} from "../../hooks/useEmails";
import { useDebounce } from "../../hooks/useDebounce";
import type { EmailView } from "../../types";
import {
  BsArrowClockwise,
  BsChevronLeft,
  BsChevronRight,
  BsExclamationCircle,
  BsFile,
  BsInbox,
  BsPaperclip,
  BsSend,
  BsStar,
  BsStarFill,
  BsTrash,
} from "react-icons/bs";
import {
  EmailSidebar,
  EmailSidebarTrigger,
} from "../../components/layouts/EmailSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Email() {
  const [currentView, setCurrentView] = useState<EmailView>("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const limit = 15;

  // Debounce
  const debouncedSearch = useDebounce(searchQuery, 500);

  // React Query hooks
  const {
    data: emailResponse,
    isLoading,
    refetch: refetchEmails,
  } = useEmails({
    view: currentView,
    search: debouncedSearch || undefined,
    page,
    limit,
  });

  const { data: emailCounts } = useEmailCounts();
  const toggleStarMutation = useToggleStar();

  const emails = emailResponse?.data || [];
  const pagination = emailResponse?.pagination || {
    page: 1,
    limit: 15,
    total: 0,
    totalPages: 0,
  };

  // Handle search - reset page when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  // Handle view change
  const handleViewChange = (view: EmailView) => {
    setCurrentView(view);
    setPage(1);
  };

  // Handle refresh
  const handleRefresh = () => {
    refetchEmails();
  };

  // Toggle star
  const handleToggleStar = async (emailId: string) => {
    try {
      await toggleStarMutation.mutateAsync(emailId);
    } catch (error) {
      console.error("Failed to star email:", error);
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (hours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const emailNavItems = [
    {
      icon: BsInbox,
      label: "Inbox",
      view: "inbox" as EmailView,
      count: emailCounts?.inbox,
    },
    {
      icon: BsStar,
      label: "Starred",
      view: "starred" as EmailView,
      count: emailCounts?.starred,
    },
    {
      icon: BsSend,
      label: "Sent",
      view: "sent" as EmailView,
      count: emailCounts?.sent,
    },
    {
      icon: BsExclamationCircle,
      label: "Important",
      view: "important" as EmailView,
      count: emailCounts?.important,
    },
    {
      icon: BsFile,
      label: "Drafts",
      view: "drafts" as EmailView,
      count: emailCounts?.drafts,
    },
    { icon: BsTrash, label: "Trash", view: "trash" as EmailView },
  ];

  return (
    <div className="border border-black bg-white rounded-[8px] overflow-hidden p-3 lg:p-5 flex gap-5 items-start">
      {/* Sidebar */}
      <EmailSidebar
        navItems={emailNavItems}
        currentView={currentView}
        onViewChange={handleViewChange}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex flex-col w-full container">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="gap-4 flex items-start lg:items-center justify-between">
            <div className="flex items-center gap-2">
              <EmailSidebarTrigger onClick={() => setSidebarOpen(true)} />
              <h1 className="text-lg font-semibold capitalize">
                {currentView}
              </h1>
            </div>

            <Input
              id="search"
              type="text"
              placeholder="Search..."
              className="bg-neutral-100 placeholder:text-black/40 w-full lg:w-fit"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Refresh and Pagination Buttons */}
          <div className="flex items-center justify-end lg:justify-between gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
              className="rounded-full size-7 max-sm:hidden"
            >
              <BsArrowClockwise
                size={24}
                className={`${isLoading ? "animate-spin" : ""}`}
              />
            </Button>

            <div className="flex items-center gap-2">
              <p className="max-sm:hidden">
                {pagination.total > 0
                  ? `${(pagination.page - 1) * pagination.limit + 1}-${Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )} of ${pagination.total}`
                  : "0-0 of 0"}
              </p>

              <Button
                variant="outline"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
                className="rounded-full size-7"
              >
                <BsChevronLeft size={16} />
              </Button>

              <Button
                variant="outline"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page >= pagination.totalPages}
                className="rounded-full size-7"
              >
                <BsChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="divide-y divide-black">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block size-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : emails.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-black/70 font-medium">No emails found</p>
            </div>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                className="w-full flex items-center gap-2 px-2 py-3 hover:bg-neutral-100 transition-all cursor-pointer group"
              >
                {/* select email */}
                <input
                  type="checkbox"
                  className="size-4 border border-black rounded accent-lime-600"
                />

                {/* Star email */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleStar(email.id);
                  }}
                  className="shrink-0"
                >
                  <BsStarFill
                    size={18}
                    className={`transition-all ${
                      email.isStarred
                        ? "fill-orange-500 text-orange-500"
                        : "text-black"
                    }`}
                  />
                </div>

                {/* Email Content */}
                <div>
                  <p
                    className={`mb-1 line-clamp-1 overflow-hidden ${
                      !email.isRead ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {email.subject}
                  </p>
                  <p className="line-clamp-1 overflow-hidden max-w-[55vw]">
                    {email.body}
                  </p>
                </div>

                {email.hasAttachments && (
                  <BsPaperclip size={16} className="shrink-0" />
                )}

                {/* Time */}
                <div className="shrink-0 text-right">
                  <p
                    className={`text-xs ${
                      !email.isRead ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {formatTime(email.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
