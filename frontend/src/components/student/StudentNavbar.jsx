
import { Menu, Bell, UserCircle } from "lucide-react";
import { useAuth } from "../../context/useAuth";

export default function StudentNavbar({ openSidebar }) {
  const { user } = useAuth();

  const studentName = user?.fullName || "Student";
  const studentEmail = user?.email || "Student Account";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 sm:px-6 lg:px-8">
      {/* Mobile menu and page title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={openSidebar}
          aria-label="Open navigation menu"
          className="rounded-xl border border-slate-800 p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <h1 className="text-sm font-semibold text-white sm:text-base">
            Student Workspace
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block">
            Computer Literacy Learning Portal
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Bell size={21} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-800 pl-3 sm:pl-5">
          <div className="hidden text-right sm:block">
            <p className="max-w-36 truncate text-sm font-semibold text-white">
              {studentName}
            </p>
            <p className="max-w-36 truncate text-xs text-slate-500">
              {studentEmail}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
            {studentName ? (
              <span className="font-bold">
                {studentName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <UserCircle size={22} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
