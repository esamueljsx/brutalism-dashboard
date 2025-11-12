import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  BsArrowRight, 
  BsChevronDown
} from "react-icons/bs"; 
import { navItems } from "@/utils/data";

export function AppSidebar() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-black">
      <SidebarContent className="hide-scroll">
        <SidebarGroup className="space-y-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-[24px] font-black flex items-center gap-1 mx-3 pt-2"
          >
            <span className="size-6 rounded-[4px] border text-black bg-lime-200 border-black shadow-[3px_3px_0_0_#000000] flex items-center justify-center">
              B
            </span>
            <span className="inline">rutalism</span>
          </Link>

          {/* Navigation Items */}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const isOpen = openDropdown === item.name;

                if (item.hasDropdown && item.subItems) {
                  // Item with dropdown and sub-items
                  return (
                    <Collapsible
                      key={item.name}
                      open={isOpen}
                      onOpenChange={() => toggleDropdown(item.name)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isActive}
                            tooltip={item.name}
                            className="rounded-[4px] border border-transparent data-[active=true]:border-black hover:border-black data-[active=true]:bg-white hover:bg-white hover:shadow-sm"
                          >
                            <item.icon size={14} />
                            <span>{item.name}</span>
                            <BsChevronDown
                              size={14}
                              className={`ml-auto transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.name}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={location.pathname === subItem.href}
                                  className={`rounded-[4px] border border-black w-full px-4 ${
                                    location.pathname === subItem.href
                                      ? "bg-white"
                                      : "hover:bg-white hover:border-black border-transparent"
                                  }`}
                                >
                                  <Link to={subItem.href}>{subItem.name}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                } else if (item.hasDropdown) {
                  // Item with dropdown but no sub-items (just a placeholder)
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                        className="rounded-[4px] border border-transparent data-[active=true]:border-black hover:border-black data-[active=true]:bg-white hover:bg-white hover:shadow-sm"
                      >
                        <Link to={item.href}>
                          <item.icon size={14} />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                } else {
                  // Regular item without dropdown
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                        className="rounded-[4px] border border-transparent data-[active=true]:border-black hover:border-black data-[active=true]:bg-white hover:bg-white hover:shadow-sm"
                      >
                        <Link to={item.href}>
                          <item.icon size={14} />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Upgrade Card */}
          <div className="py-4 px-1">
            <Card className="gap-0 rounded-[4px]">
              <h4 className="text-lg font-bold mb-2">Upgrade to Pro</h4>
              <p className="text-sm mb-6">
                Are you looking for more features? Check out our Pro version.
              </p>
              <Button className="w-fit">
                <BsArrowRight className="size-3" />
                Upgrade Now
              </Button>
            </Card>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
