
import { useState } from "react";
import { Outlet } from "react-router-dom";

import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <StudentSidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-72">
        <StudentNavbar
          openSidebar={() => setSidebarOpen(true)}
        />

        <main className="min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
