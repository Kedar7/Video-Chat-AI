import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import SteamProvider from "@/providers/StreamProvider";
import React, { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="h-full relative">
      {/* Sidebar - Fixed on desktop, hidden on mobile */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <SideBar />
      </div>

      {/* Main Content Area */}
      <main className="md:pl-72">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <NavBar />
        </div>

        {/* Page Content */}
        <div className="h-full p-4 md:p-8">
          <SteamProvider>{children}</SteamProvider>
          <div className="fixed bottom-4 right-4 text-sm text-gray-400">
            © Kedar Kulkarni
          </div>
        </div>
      </main>

      {/* Mobile Navigation - Bottom bar on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-sm mx-auto">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
