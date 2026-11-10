
import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Clock,
  CheckCircle,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Filter,
} from "lucide-react";

const subjects = [
  {
    id: 1,
    title: "Computer Packages",
    category: "Computer Applications",
    description: "Learn essential computer applications and office productivity tools.",
    lessons: 12,
    completed: 10,
    duration: "8 weeks",
    color: "blue",
    topics: [
      "Introduction to Computers",
      "Microsoft Windows",
      "Microsoft Word",
      "Microsoft Excel",
      "Microsoft PowerPoint",
      "Internet and Email",
    ],
  },
  {
    id: 2,
    title: "Microsoft Excel",
    category: "Office Applications",
    description: "Master spreadsheets, formulas, functions and data analysis.",
    lessons: 10,
    completed: 6,
    duration: "6 weeks",
    color: "emerald",
    topics: [
      "Introduction to Excel",
      "Worksheets and Workbooks",
      "Formatting Cells",
      "Formulas and Functions",
      "Charts and Graphs",
      "Data Management",
    ],
  },
  {
    id: 3,
    title: "Introduction to IT",
    category: "Computer Fundamentals",
    description: "Understand computer fundamentals, hardware and software.",
    lessons: 8,
    completed: 4,
    duration: "4 weeks",
    color: "purple",
    topics: [
      "Introduction to Information Technology",
      "Computer Hardware",
      "Computer Software",
      "Operating Systems",
      "Computer Networks",
      "Cybersecurity Basics",
    ],
  },
];

const colorStyles = {
  blue: {
    icon: "bg-blue-500/10 text-blue-400",
    progress: "bg-blue-500",
    text: "text-blue-400",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400",
    progress: "bg-emerald-500",
    text: "text-emerald-400",
  },
  purple: {
    icon: "bg-purple-500/10 text-purple-400",
    progress: "bg-purple-500",
    text: "text-purple-400",
  },
};

export default function MySubjects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const categories = [
    "All",
    ...new Set(subjects.map((subject) => subject.category)),
  ];

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch =
        subject.title.toLowerCase().includes(search.toLowerCase()) ||
        subject.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || subject.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totalLessons = subjects.reduce(
    (total, subject) => total + subject.lessons,
    0
  );

  const completedLessons = subjects.reduce(
    (total, subject) => total + subject.completed,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-7 text-white sm:px-6 lg:px-8">

      {/* Page heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-blue-400">
          Student Workspace / My Subjects
        </p>

        <h1 className="text-2xl font-bold sm:text-3xl">
          My Subjects
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Explore your enrolled subjects and continue your learning journey.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
            <BookOpen size={21} />
          </div>

          <p className="text-sm text-slate-400">Enrolled Subjects</p>
          <h2 className="mt-1 text-3xl font-bold">
            {subjects.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle size={21} />
          </div>

          <p className="text-sm text-slate-400">Completed Lessons</p>
          <h2 className="mt-1 text-3xl font-bold">
            {completedLessons}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <GraduationCap size={21} />
          </div>

          <p className="text-sm text-slate-400">Total Lessons</p>
          <h2 className="mt-1 text-3xl font-bold">
            {totalLessons}
          </h2>
        </div>

      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full lg:max-w-md">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your subjects..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-400" />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 sm:w-auto"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Subject cards */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          Your Learning Subjects
        </h2>

        <span className="text-sm text-slate-500">
          {filteredSubjects.length} subjects
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {filteredSubjects.map((subject) => {
          const progress = Math.round(
            (subject.completed / subject.lessons) * 100
          );

          const styles = colorStyles[subject.color];
          const isExpanded = expanded === subject.id;

          return (
            <div
              key={subject.id}
              className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-slate-700"
            >

              <div className="p-5">

                <div className="mb-5 flex items-start justify-between">

                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`}>
                    <BookOpen size={23} />
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.icon}`}>
                    {progress}% Complete
                  </span>

                </div>

                <p className="mb-2 text-xs text-blue-400">
                  {subject.category}
                </p>

                <h3 className="text-xl font-bold">
                  {subject.title}
                </h3>

                <p className="mt-2 min-h-10 text-sm leading-6 text-slate-400">
                  {subject.description}
                </p>

                {/* Subject information */}
                <div className="my-5 flex flex-wrap gap-5 text-xs text-slate-400">

                  <span className="flex items-center gap-2">
                    <BookOpen size={15} />
                    {subject.lessons} Lessons
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock size={15} />
                    {subject.duration}
                  </span>

                </div>

                {/* Progress */}
                <div className="mb-3 flex justify-between text-xs">
                  <span className="text-slate-400">
                    Learning Progress
                  </span>

                  <span className={styles.text}>
                    {subject.completed} of {subject.lessons} lessons
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all ${styles.progress}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Expand button */}
                <button
                  type="button"
                  onClick={() =>
                    setExpanded(isExpanded ? null : subject.id)
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {isExpanded ? "Hide Lessons" : "View Lessons"}

                  {isExpanded ? (
                    <ChevronUp size={17} />
                  ) : (
                    <ChevronDown size={17} />
                  )}
                </button>

              </div>

              {/* Lessons list */}
              {isExpanded && (
                <div className="border-t border-slate-800 bg-slate-950/50 p-5">

                  <h4 className="mb-4 font-semibold">
                    Subject Lessons
                  </h4>

                  <div className="space-y-3">
                    {subject.topics.map((topic, index) => {
                      const isCompleted = index < subject.completed;

                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-lg border border-slate-800 p-3"
                        >
                          {isCompleted ? (
                            <CheckCircle
                              size={19}
                              className="shrink-0 text-emerald-400"
                            />
                          ) : (
                            <PlayCircle
                              size={19}
                              className="shrink-0 text-blue-400"
                            />
                          )}

                          <span className="flex-1 text-sm text-slate-300">
                            {topic}
                          </span>

                          <span className={`text-xs ${isCompleted ? "text-emerald-400" : "text-slate-500"}`}>
                            {isCompleted ? "Completed" : "Pending"}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* Empty state */}
      {filteredSubjects.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
          <BookOpen size={40} className="mx-auto mb-4 text-slate-500" />

          <h3 className="text-lg font-semibold">
            No subjects found
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Try searching with a different subject name or category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}
