
import { useMemo, useState } from "react";
import {
  Users,
  BookOpen,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Download,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Award,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", students: 35, materials: 20 },
  { month: "Feb", students: 48, materials: 32 },
  { month: "Mar", students: 42, materials: 28 },
  { month: "Apr", students: 65, materials: 45 },
  { month: "May", students: 58, materials: 39 },
  { month: "Jun", students: 82, materials: 55 },
  { month: "Jul", students: 72, materials: 48 },
  { month: "Aug", students: 95, materials: 68 },
  { month: "Sep", students: 88, materials: 60 },
  { month: "Oct", students: 110, materials: 78 },
  { month: "Nov", students: 102, materials: 72 },
  { month: "Dec", students: 125, materials: 90 },
];

const studentPerformance = [
  { name: "Ahmed Hassan", subject: "Computer Packages", score: 92, status: "Excellent" },
  { name: "Fatima Ali", subject: "Microsoft Excel", score: 85, status: "Very Good" },
  { name: "Mohamed Omar", subject: "Introduction to IT", score: 78, status: "Good" },
  { name: "Amina Yusuf", subject: "Microsoft Word", score: 68, status: "Average" },
  { name: "Abdi Hassan", subject: "Computer Packages", score: 55, status: "Needs Improvement" },
];

const activities = [
  { title: "New student registered", detail: "A new student joined the portal", time: "10 minutes ago" },
  { title: "Assignment submitted", detail: "A student submitted an assignment", time: "1 hour ago" },
  { title: "New learning material", detail: "A PDF learning material was added", time: "3 hours ago" },
  { title: "Subject published", detail: "Microsoft Excel was published", time: "Yesterday" },
];

function StatCard({ title, value, change, icon: Icon, positive = true }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
          <Icon size={22} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold ${positive ? "text-emerald-400" : "text-red-400"}`}>
          {positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-400">{title}</p>
      <h3 className="mt-1 text-2xl font-bold text-white">{value}</h3>
    </div>
  );
}

export default function AdminReports() {
  const [period, setPeriod] = useState("This year");
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(
    () =>
      studentPerformance.filter((student) =>
        `${student.name} ${student.subject}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const maxStudents = Math.max(...monthlyData.map((item) => item.students));

  return (
    <div className="space-y-7 pb-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-slate-400">
            Monitor student performance and portal activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
          >
            <option>This year</option>
            <option>This month</option>
            <option>This week</option>
          </select>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Download size={17} />
            Export Report
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value="248"
          change="+12.5%"
          icon={Users}
        />
        <StatCard
          title="Learning Materials"
          value="86"
          change="+8.2%"
          icon={BookOpen}
        />
        <StatCard
          title="Assignments"
          value="42"
          change="+5.4%"
          icon={ClipboardList}
        />
        <StatCard
          title="Average Performance"
          value="78%"
          change="+3.6%"
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 xl:col-span-2">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">Student Growth</h2>
              <p className="mt-1 text-xs text-slate-400">
                Monthly student registration overview
              </p>
            </div>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              Students
            </span>
          </div>

          <div className="flex h-64 items-end justify-between gap-2">
            {monthlyData.map((item) => (
              <div key={item.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="flex h-full w-full items-end justify-center">
                  <div
                    title={`${item.students} students`}
                    className="w-full max-w-8 rounded-t-md bg-blue-500 transition hover:bg-blue-400"
                    style={{ height: `${(item.students / maxStudents) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 sm:text-xs">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="font-semibold text-white">Student Performance</h2>
          <p className="mt-1 text-xs text-slate-400">
            Overall performance distribution
          </p>

          <div className="mt-8 space-y-6">
            {[
              { label: "Excellent", value: 35, color: "bg-emerald-500" },
              { label: "Very Good", value: 30, color: "bg-blue-500" },
              { label: "Good", value: 20, color: "bg-violet-500" },
              { label: "Average", value: 10, color: "bg-amber-500" },
              { label: "Needs Improvement", value: 5, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-slate-400">{item.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student performance table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-white">Student Performance Report</h2>
            <p className="mt-1 text-xs text-slate-400">
              Sample student assessment results
            </p>
          </div>

          <input
            type="search"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-950/60 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Score</th>
                <th className="px-5 py-4">Performance</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.name} className="transition hover:bg-slate-800/40">
                  <td className="px-5 py-4 font-medium text-white">{student.name}</td>
                  <td className="px-5 py-4 text-slate-400">{student.subject}</td>
                  <td className="px-5 py-4 font-semibold text-white">{student.score}%</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      student.score >= 85
                        ? "bg-emerald-500/10 text-emerald-400"
                        : student.score >= 70
                        ? "bg-blue-500/10 text-blue-400"
                        : student.score >= 60
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-red-500/10 text-red-400"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-5 py-10 text-center text-slate-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent activities */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
            <Activity size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Recent Portal Activity</h2>
            <p className="text-xs text-slate-400">Latest system activities</p>
          </div>
        </div>

        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{activity.title}</p>
                <p className="mt-1 text-xs text-slate-400">{activity.detail}</p>
              </div>
              <span className="whitespace-nowrap text-xs text-slate-500">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
        <Award className="shrink-0 text-blue-400" size={22} />
        <p className="text-sm text-slate-300">
          These reports currently use sample data. We will connect them to
          MongoDB when we reach the backend integration stage.
        </p>
      </div>
    </div>
  );
}
