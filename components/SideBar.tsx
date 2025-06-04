"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import 'bootstrap-icons/font/bootstrap-icons.css';

const SideBar = () => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Home",
      icon: "bi-house",
      href: "/",
      color: "text-blue-500",
    },
    {
      label: "Upcoming",
      icon: "bi-calendar-event",
      href: "/upcoming",
      color: "text-violet-500",
    },
    {
      label: "Recordings",
      icon: "bi-record-circle",
      href: "/recordings",
      color: "text-pink-500",
    },
    {
      label: "Personal Room",
      icon: "bi-person-video",
      href: "/personal",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Logo and Brand - Desktop */}
      <div className="px-3 py-2 hidden md:block border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white">
            <i className="bi bi-camera-video text-xl"></i>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            AI Video Chat
          </span>
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <div className="px-3 py-2 flex-1 hidden md:block">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <i className={cn("bi", route.icon, "mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden grid grid-cols-4 w-full h-11">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center justify-center border-t transition-colors",
              pathname === route.href
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-blue-500"
            )}
          >
            <i className={cn("bi", route.icon, "text-base", route.color)} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
