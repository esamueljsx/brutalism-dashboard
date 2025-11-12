import { Button } from "@/components/ui/button";
import { BsPencilSquare, BsTag, BsList } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import type { EmailView } from "../../types";
import type { IconType } from "react-icons/lib";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface NavItem {
  icon: IconType;
  label: string;
  view: EmailView;
  count?: number;
}

interface EmailSidebarProps {
  navItems: NavItem[];
  currentView: EmailView;
  onViewChange: (view: EmailView) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EmailSidebar({
  navItems,
  currentView,
  onViewChange,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: EmailSidebarProps) {
  const { user } = useAuth();
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled or internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;

  const handleViewChange = (view: EmailView) => {
    onViewChange(view);
    setOpen(false); // Close mobile menu after selection
  };

  // Sidebar content component (reused for desktop and mobile)
  const SidebarContent = () => (
    <div className="space-y-1">
      {/* User Profile */}
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 thick-shadow-sm rounded-full bg-white flex items-center justify-center overflow-hidden">
          <img
            src="https://brutalism.tailwinddashboard.com/src/img/avatar/female1.jpg"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base truncate">
            {user?.name || "User"}
          </p>
          <p className="text-sm text-gray-600 truncate">Web developer</p>
        </div>
      </div>

      <Button className="w-full">
        <BsPencilSquare size={16} />
        Compose
      </Button>

      <nav className="space-y-0.5 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          return (
            <Button
              variant={isActive ? "outline" : "link"}
              key={item.view}
              onClick={() => handleViewChange(item.view)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] h-fit font-medium text-sm ${
                isActive
                  ? "lg:bg-neutral-100 bg-white"
                  : "border-transparent border hover:bg-white lg:hover:bg-neutral-100 hover:border hover:border-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={16} />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className="text-xs font-medium">{item.count}</span>
              )}
            </Button>
          );
        })}
      </nav>

      <div className="mt-4">
        <h3 className="font-medium text-sm mb-1 px-2">Labels</h3>
        <div className="space-y-0.5">
          {["Work", "Family", "Friends", "Office"].map((label) => (
            <Button
              variant="link"
              key={label}
              className="border-transparent border w-full hover:bg-white lg:hover:bg-neutral-100 hover:border hover:border-black h-auto py-2 px-3 font-medium text-sm justify-start rounded-[6px]"
            >
              <BsTag size={16} />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[320px] p-4">
          <div className="mt-4">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:block w-[320px]">
        <SidebarContent />
      </aside>
    </>
  );
}

// Export the mobile trigger button as a separate component
export function EmailSidebarTrigger({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="lg:hidden size-7 rounded-full bg-neutral-100"
      onClick={onClick}
    >
      <BsList size={16} />
    </Button>
  );
}
