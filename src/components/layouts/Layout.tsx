import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import {
  BsBellFill,
  BsBoxArrowRight,
  BsEnvelopeFill,
  BsGearFill,
  BsPersonFill,
  BsQuestionSquareFill,
  BsSearch,
  BsTranslate,
} from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { logout } = useAuth();

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="sticky top-0 z-30 flex py-2 px-3 md:px-4 shrink-0 items-center justify-between gap-2 border-b border-black bg-background">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="thick-shadow-sm rounded-full bg-white md:hidden" />

            {/* Search Bar Here */}
            <div className="hidden md:flex relative items-stretch">
              <Input
                id="search"
                type="text"
                placeholder="Search..."
                className="bg-white/60 placeholder:text-black/40"
              />
              <div className="absolute top-0.5 end-0 -me-px">
                <span className="flex py-2 px-3 -ms-1 focus:ring-0">
                  <BsSearch size={16} />
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="size-7 thick-shadow-sm rounded-full bg-white hidden md:flex items-center justify-center">
              <BsGearFill size={16} />
            </div>

            <div className="size-7 thick-shadow-sm rounded-full bg-white flex items-center justify-center">
              <BsTranslate size={16} />
            </div>

            <div className="relative">
              <div className="size-7 thick-shadow-sm rounded-full bg-white flex items-center justify-center">
                <BsEnvelopeFill size={16} />
              </div>
              <div className="absolute -top-0.5 size-3 right-0 flex items-center justify-center rounded-full pointer-events-none text-[10px] leading-0 font-medium bg-red-300 text-black">
                4
              </div>
            </div>

            <div className="relative">
              <div className="size-7 thick-shadow-sm rounded-full bg-white flex items-center justify-center">
                <BsBellFill size={16} />
              </div>
              <div className="absolute -top-0.5 size-3 right-0 flex items-center justify-center rounded-full pointer-events-none text-[10px] leading-0 font-medium bg-red-300 text-black">
                1
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="size-7 thick-shadow-sm rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src="https://brutalism.tailwinddashboard.com/src/img/avatar/male3.jpg"
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent
                align="end"
                className="rounded-[8px] w-full min-w-[180px] py-1 px-0"
              >
                <DropdownMenuItem className="">
                  <BsPersonFill size={16} />
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <BsGearFill size={16} />
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <BsQuestionSquareFill size={16} />
                  <Link to="/settings">Help</Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={logout}>
                  <BsBoxArrowRight size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 mx-auto container">{children}</main>

        {/* Footer */}
        <footer className="pt-2 pb-6">
          <p className="text-center text-sm">
            Copyright &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
