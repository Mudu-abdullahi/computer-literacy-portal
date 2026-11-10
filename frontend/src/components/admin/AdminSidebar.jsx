
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  X,
  Library,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
    end: true,
  },
  {
    label: "Students",
    icon: Users,
    path: "/admin/students",
  },
  {
    label: "Learning Materials",
    icon: BookOpen,
    path: "/admin/materials",
  },
  {
    label: "Subjects",
    icon: Library,
    path: "/admin/subjects",
  },
  {
    label: "Assignments",
    icon: FileText,
    path: "/admin/assignments",
  },
  {
    label: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function AdminSidebar({ onClose, onLogout }) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900 text-white">

      {/* Brand */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
            <BookOpen size={24} />
          </div>

          <div>
            <h2 className="text-sm font-bold">
              Computer Literacy
            </h2>

            <p className="mt-1 text-xs text-blue-300">
              Administration Portal
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        <div className="space-y-2">
          {menuItems.map(({ label, icon: Icon, path, end }) => (
            <NavLink
              key={label}
              to={path}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-800 p-4">
        <div className="mb-4 rounded-xl border border-slate-700 bg-slate-800 p-4">
          <div className="mb-2 flex items-center gap-2 text-blue-300">
            <BookOpen size={21} />

            <span className="text-xs font-semibold">
              Learning Portal
            </span>
          </div>

          <p className="text-xs leading-5 text-slate-400">
            Manage students and learning resources from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
