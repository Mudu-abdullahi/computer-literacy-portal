
import {
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  FileText,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Clock,
  MoreHorizontal,
  Activity,
  Download,
  Settings,
  CalendarDays,
  Bell,
} from "lucide-react";

import { Link } from "react-router-dom";

const statistics = [
  {
    title: "Total Students",
    value: "1,250",
    change: "+12.5%",
    positive: true,
    icon: Users,
    color: "blue",
    description: "Compared to last month",
  },
  {
    title: "Active Students",
    value: "1,080",
    change: "+8.2%",
    positive: true,
    icon: UserCheck,
    color: "emerald",
    description: "Currently active learners",
  },
  {
    title: "Learning Materials",
    value: "86",
    change: "+6.4%",
    positive: true,
    icon: BookOpen,
    color: "purple",
    description: "Available learning resources",
  },
  {
    title: "Subjects",
    value: "12",
    change: "+2",
    positive: true,
    icon: GraduationCap,
    color: "orange",
    description: "Registered subjects",
  },
];

const weeklyActivity = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 50 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 60 },
];

const recentStudents = [
  {
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    date: "Today",
    status: "Active",
    initials: "AH",
  },
  {
    name: "Fatima Ali",
    email: "fatima@example.com",
    date: "Yesterday",
    status: "Pending",
    initials: "FA",
  },
  {
    name: "Mohamed Omar",
    email: "mohamed@example.com",
    date: "Nov 2, 2026",
    status: "Active",
    initials: "MO",
  },
  {
    name: "Amina Yusuf",
    email: "amina@example.com",
    date: "Nov 1, 2026",
    status: "Active",
    initials: "AY",
  },
];

const quickActions = [
  {
    title: "Manage Students",
    description: "View and manage student accounts",
    icon: Users,
    link: "/admin/students",
    color: "blue",
  },
  {
    title: "Add Learning Materials",
    description: "Upload new learning resources",
    icon: FileText,
    link: "/admin/materials",
    color: "purple",
  },
  {
    title: "Manage Subjects",
    description: "Organize learning subjects",
    icon: BookOpen,
    link: "/admin/subjects",
    color: "emerald",
  },
  {
    title: "View Reports",
    description: "Monitor learning performance",
    icon: ClipboardList,
    link: "/admin/reports",
    color: "orange",
  },
];

const colorStyles = {
  blue: {
    icon: "bg-blue-500/10 text-blue-400",
    accent: "bg-blue-500",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400",
    accent: "bg-emerald-500",
  },
  purple: {
    icon: "bg-purple-500/10 text-purple-400",
    accent: "bg-purple-500",
  },
  orange: {
    icon: "bg-orange-500/10 text-orange-400",
    accent: "bg-orange-500",
  },
};

function StatCard({ item }) {
  const Icon = item.icon;
  const styles = colorStyles[item.color];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-3 ${styles.icon}`}>
          <Icon size={22} />
        </div>

        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
          <TrendingUp size={14} />
          {item.change}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-400">{item.title}</p>
        <h3 className="mt-1 text-3xl font-bold text-white">
          {item.value}
        </h3>
        <p className="mt-2 text-xs text-slate-500">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen space-y-8 bg-slate-950 text-white">

      {/* Welcome header */}
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-blue-400">
            ADMINISTRATION OVERVIEW
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Welcome back, Administrator!
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Here is what's happening with your learning platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
            <CalendarDays size={17} className="text-blue-400" />
            November 2026
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Plus size={18} />
            Quick Action
          </button>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Platform Statistics</h2>
          <span className="text-xs text-slate-500">
            Sample dashboard data
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => (
            <StatCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      {/* Activity and overview */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Weekly activity chart */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Student Activity</h2>
              <p className="mt-1 text-xs text-slate-400">
                Weekly platform engagement overview
              </p>
            </div>

            <button className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800">
              This Week
            </button>
          </div>

          <div className="mt-8 flex h-56 items-end justify-between gap-3 border-b border-l border-slate-800 px-2 pb-2">
            {weeklyActivity.map((item) => (
              <div
                key={item.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    title={`${item.value}% activity`}
                    className="w-full rounded-t-lg bg-blue-500/80 transition-all hover:bg-blue-400"
                    style={{ height: `${item.value}%` }}
                  />
                </div>

                <span className="text-xs text-slate-500">
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            Student engagement
          </div>
        </div>

        {/* Platform overview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="font-semibold">Platform Overview</h2>
          <p className="mt-1 text-xs text-slate-400">
            Current learning resources
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Students</span>
                <span className="font-semibold">1,250</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[85%] rounded-full bg-blue-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Active learners</span>
                <span className="font-semibold">1,080</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[72%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Learning materials</span>
                <span className="font-semibold">86</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[60%] rounded-full bg-purple-500" />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Activity size={18} />
              <span className="text-sm font-semibold">
                Platform Status
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Your learning platform dashboard is ready for management.
            </p>
          </div>
        </div>
      </section>

      {/* Recent students */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-5">
          <div>
            <h2 className="font-semibold">Recent Students</h2>
            <p className="mt-1 text-xs text-slate-400">
              Recently registered student accounts
            </p>
          </div>

          <Link
            to="/admin/students"
            className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            View all
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-slate-950/50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium">Student</th>
                <th className="px-5 py-4 font-medium">Registration</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {recentStudents.map((student) => (
                <tr
                  key={student.email}
                  className="transition hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-400">
                        {student.initials}
                      </div>

                      <div>
                        <p className="font-medium text-white">
                          {student.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {student.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        student.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      to="/admin/students"
                      className="text-slate-400 transition hover:text-blue-400"
                      aria-label={`View ${student.name}`}
                    >
                      <ArrowUpRight size={18} className="ml-auto" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <p className="mt-1 text-xs text-slate-400">
            Manage your learning platform efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const styles = colorStyles[action.color];

            return (
              <Link
                key={action.title}
                to={action.link}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-800/70"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${styles.icon}`}>
                    <Icon size={21} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-600 transition group-hover:text-blue-400"
                  />
                </div>

                <h3 className="mt-5 font-semibold text-white">
                  {action.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
