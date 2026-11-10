
import {
  Bell,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";

export default function AdminNavbar({
  onMenuClick,
  adminName = "Administrator",
}) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-5 text-white shadow-sm md:px-8">

      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={23} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-white">
            Administration
          </h2>

          <p className="text-xs text-slate-400">
            Manage your learning portal
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 transition focus-within:border-blue-500 sm:flex">
          <Search size={17} className="text-slate-500" />

          <input
            type="search"
            placeholder="Search..."
            className="w-28 border-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 md:w-40"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Bell size={21} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-slate-950 bg-red-500" />
        </button>

        {/* Administrator profile */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-3 md:pl-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-400">
            {adminName.charAt(0).toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">
              {adminName}
            </p>

            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-500 sm:block"
          />
        </div>
      </div>
    </header>
  );
}
