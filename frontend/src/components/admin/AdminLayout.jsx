
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useAuth } from "../../context/useAuth";

export default function AdminLayout() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmed) return;

    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Mobile sidebar overlay */}
      {mobileMenu && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0 ${
          mobileMenu
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <AdminSidebar
          onClose={() => setMobileMenu(false)}
          onLogout={handleLogout}
        />
      </div>

      {/* Main content */}
      <div className="min-h-screen bg-slate-950 lg:pl-64">

        {/* Navbar */}
        <AdminNavbar
          onMenuClick={() => setMobileMenu(true)}
          adminName={user?.fullName || "Administrator"}
        />

        {/* Page content */}
        <main className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-[1600px] bg-slate-950 p-5 text-white md:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
