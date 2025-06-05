"use client";

import { UserButton } from "@clerk/nextjs";
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavBar = () => {
  return (
    <nav className="flex items-center justify-end px-4 py-3 md:px-8">
      {/* User Menu */}
      <div className="flex items-center space-x-4">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
