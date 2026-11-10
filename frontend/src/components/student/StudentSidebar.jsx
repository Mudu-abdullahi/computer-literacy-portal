
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  ClipboardList,
  Download,
  User,
  LogOut,
  GraduationCap,
  X,
} from "lucide-react";

import { useAuth } from "../../context/useAuth";

const menuItems = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Subjects",
    path: "/student/subjects",
    icon: BookOpen,
  },
  {
    name: "Learning Materials",
    path: "/student/materials",
    icon: FileText,
  },
  {
    name: "Assignments",
    path: "/student/assignments",
    icon: ClipboardList,
  },
  {
    name: "My Downloads",
    path: "/student/downloads",
    icon: Download,
  },
  {
    name: "My Profile",
    path: "/student/profile",
    icon: User,
  },
];

export default function StudentSidebar({
  isOpen,
  closeSidebar,
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    closeSidebar();
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-900 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2.5 text-white">
              <GraduationCap size={24} />
            </div>

            <div>
              <h2 className="font-bold text-white">
                Learning Portal
              </h2>

              <p className="text-xs text-slate-500">
                Student Workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Learning Menu
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom information */}
        <div className="border-t border-slate-800 p-4">
          <div className="mb-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <GraduationCap
              className="mb-2 text-blue-400"
              size={22}
            />

            <p className="text-sm font-semibold text-white">
              Keep Learning!
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Build your computer skills one lesson at a time.
            </p>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
