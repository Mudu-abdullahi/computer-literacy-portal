
import { useState } from "react";
import {
  BookOpen,
  FileText,
  ClipboardList,
  Download,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  CalendarDays,
  CheckCircle,
  PlayCircle,
  Bell,
  BookMarked,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const subjects = [
  {
    id: 1,
    name: "Computer Packages",
    description: "Learn essential computer applications.",
    progress: 85,
    lessons: 12,
    completed: 10,
    color: "blue",
  },
  {
    id: 2,
    name: "Microsoft Excel",
    description: "Develop spreadsheet and data skills.",
    progress: 65,
    lessons: 10,
    completed: 6,
    color: "emerald",
  },
  {
    id: 3,
    name: "Introduction to IT",
    description: "Understand computer systems and technology.",
    progress: 45,
    lessons: 8,
    completed: 4,
    color: "purple",
  },
];

const assignments = [
  {
    id: 1,
    title: "Microsoft Word Practical",
    subject: "Computer Packages",
    dueDate: "Nov 08, 2026",
    status: "Pending",
  },
  {
    id: 2,
    title: "Excel Formulas Exercise",
    subject: "Microsoft Excel",
    dueDate: "Nov 12, 2026",
    status: "Pending",
  },
  {
    id: 3,
    title: "Introduction to Computers",
    subject: "Introduction to IT",
    dueDate: "Nov 15, 2026",
    status: "Submitted",
  },
];

const activities = [
  {
    id: 1,
    title: "Completed Microsoft Word lesson",
    description: "You completed a lesson in Computer Packages.",
    time: "Today",
    icon: CheckCircle,
    color: "text-emerald-400",
  },
  {
    id: 2,
    title: "Downloaded Excel notes",
    description: "You downloaded Excel Fundamentals notes.",
    time: "Yesterday",
    icon: Download,
    color: "text-blue-400",
  },
  {
    id: 3,
    title: "Started Introduction to IT",
    description: "You started learning about computer systems.",
    time: "2 days ago",
    icon: PlayCircle,
    color: "text-purple-400",
  },
];

const stats = [
  {
    title: "Enrolled Subjects",
    value: "3",
    description: "Your active subjects",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Completed Lessons",
    value: "20",
    description: "Keep learning",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Assignments",
    value: "2",
    description: "Awaiting submission",
    icon: ClipboardList,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    title: "Downloaded Notes",
    value: "15",
    description: "Available offline",
    icon: Download,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

function getAssignmentStatus(assignment) {
  if (assignment.status === "Submitted") {
    return "Submitted";
  }

  const dueDate = new Date(`${assignment.dueDate}, 00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return dueDate < today ? "Overdue" : "Pending";
}

function StatusBadge({ status }) {
  const styles = {
    Submitted: "bg-emerald-500/10 text-emerald-400",
    Pending: "bg-orange-500/10 text-orange-400",
    Overdue: "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-700 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [showAllActivities, setShowAllActivities] = useState(false);

  const studentName = user?.fullName || "Student";
  const firstName = studentName.trim().split(/\s+/)[0];

  const initials = studentName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const displayedActivities = showAllActivities
    ? activities
    : activities.slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Welcome section */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 to-blue-950/40 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-400">
              STUDENT LEARNING PORTAL
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome back, {firstName}! 👋
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Continue your learning journey. Keep practising, complete your
              lessons, and stay on top of your assignments.
            </p>

            <Link
              to="/student/subjects"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              Continue Learning
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
              {initials || "S"}
            </div>

            <div>
              <p className="font-semibold">{studentName}</p>
              <p className="text-sm text-slate-400">
                {user?.email || "Student Account"}
              </p>
              <span className="mt-1 inline-block rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
                Student
              </span>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Learning Overview</h2>
            <span className="text-xs text-slate-500">Your learning summary</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{stat.title}</p>
                      <h3 className="mt-2 text-3xl font-bold">
                        {stat.value}
                      </h3>
                    </div>

                    <div className={`rounded-xl p-3 ${stat.bg}`}>
                      <Icon className={stat.color} size={23} />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Subjects and progress */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">My Learning Progress</h2>
              <p className="mt-1 text-sm text-slate-400">
                Track your progress across subjects.
              </p>
            </div>

            <Link
              to="/student/subjects"
              className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <BookMarked className="text-blue-400" size={22} />
                  </div>

                  <span className="text-lg font-bold text-blue-400">
                    {subject.progress}%
                  </span>
                </div>

                <h3 className="font-semibold">{subject.name}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {subject.description}
                </p>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs text-slate-400">
                    <span>Course progress</span>
                    <span>
                      {subject.completed}/{subject.lessons} lessons
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  to="/student/subjects"
                  className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  Continue subject
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Assignments and quick access */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-bold">Recent Assignments</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Keep track of your coursework.
                </p>
              </div>

              <Link
                to="/student/assignments"
                className="text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {assignments.map((assignment) => {
                const status = getAssignmentStatus(assignment);

                return (
                  <div
                    key={assignment.id}
                    className="flex flex-col justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-blue-500/10 p-3">
                        <FileText className="text-blue-400" size={20} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold">
                          {assignment.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {assignment.subject}
                        </p>
                        <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                          <CalendarDays size={13} />
                          Due: {assignment.dueDate}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={status} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick access */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="font-bold">Quick Access</h2>
            <p className="mt-1 text-sm text-slate-400">
              Find your learning resources.
            </p>

            <div className="mt-5 space-y-3">
              <Link
                to="/student/subjects"
                className="flex items-center gap-3 rounded-lg border border-slate-800 p-3 transition hover:border-blue-500/50 hover:bg-slate-800"
              >
                <BookOpen className="text-blue-400" size={20} />
                <span className="flex-1 text-sm font-medium">My Subjects</span>
                <ArrowRight size={16} className="text-slate-500" />
              </Link>

              <Link
                to="/student/materials"
                className="flex items-center gap-3 rounded-lg border border-slate-800 p-3 transition hover:border-blue-500/50 hover:bg-slate-800"
              >
                <FileText className="text-emerald-400" size={20} />
                <span className="flex-1 text-sm font-medium">
                  Learning Materials
                </span>
                <ArrowRight size={16} className="text-slate-500" />
              </Link>

              <Link
                to="/student/assignments"
                className="flex items-center gap-3 rounded-lg border border-slate-800 p-3 transition hover:border-blue-500/50 hover:bg-slate-800"
              >
                <ClipboardList className="text-orange-400" size={20} />
                <span className="flex-1 text-sm font-medium">Assignments</span>
                <ArrowRight size={16} className="text-slate-500" />
              </Link>

              <Link
                to="/student/downloads"
                className="flex items-center gap-3 rounded-lg border border-slate-800 p-3 transition hover:border-blue-500/50 hover:bg-slate-800"
              >
                <Download className="text-purple-400" size={20} />
                <span className="flex-1 text-sm font-medium">My Downloads</span>
                <ArrowRight size={16} className="text-slate-500" />
              </Link>
            </div>
          </div>
        </section>

        {/* Recent activity */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold">Recent Activities</h2>
              <p className="mt-1 text-sm text-slate-400">
                Your latest learning activities.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAllActivities((previous) => !previous)}
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              {showAllActivities ? "Show less" : "View all"}
            </button>
          </div>

          <div className="space-y-4">
            {displayedActivities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="rounded-lg bg-slate-800 p-3">
                    <Icon size={19} className={activity.color} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-medium">
                      {activity.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {activity.description}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-xs text-slate-500">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Motivation */}
        <section className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-950/60 to-slate-900 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="rounded-xl bg-blue-500/10 p-4">
              <Award size={30} className="text-blue-400" />
            </div>

            <div className="flex-1">
              <h2 className="font-bold">Keep Growing Your Skills!</h2>
              <p className="mt-1 text-sm text-slate-400">
                Every lesson you complete brings you closer to your goals.
                Stay consistent and keep learning.
              </p>
            </div>

            <Link
              to="/student/materials"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
            >
              Explore Notes
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <footer className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
          Computer Literacy Learning Portal © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
