
import { useMemo, useState } from "react";
import {
  Download,
  Search,
  FileText,
  FileSpreadsheet,
  Presentation,
  Trash2,
  HardDrive,
  Calendar,
  BookOpen,
  RotateCcw,
  FolderOpen,
} from "lucide-react";

const initialDownloads = [
  {
    id: 1,
    title: "Introduction to Computers",
    subject: "Computer Packages",
    type: "PDF",
    size: "2.4 MB",
    date: "2026-11-02",
    content: "Introduction to Computers\n\nLearn computer fundamentals, components and applications.",
  },
  {
    id: 2,
    title: "Microsoft Word Notes",
    subject: "Computer Packages",
    type: "PDF",
    size: "3.1 MB",
    date: "2026-11-03",
    content: "Microsoft Word Notes\n\nLearn document creation, formatting and page layout.",
  },
  {
    id: 3,
    title: "Excel Fundamentals",
    subject: "Microsoft Excel",
    type: "PDF",
    size: "2.8 MB",
    date: "2026-11-04",
    content: "Excel Fundamentals\n\nLearn spreadsheets, formulas and functions.",
  },
  {
    id: 4,
    title: "PowerPoint Presentation Guide",
    subject: "Computer Packages",
    type: "PPT",
    size: "5.2 MB",
    date: "2026-11-05",
    content: "PowerPoint Presentation Guide\n\nLearn how to create professional presentations.",
  },
  {
    id: 5,
    title: "Introduction to Information Technology",
    subject: "Introduction to IT",
    type: "DOC",
    size: "1.6 MB",
    date: "2026-11-06",
    content: "Introduction to Information Technology\n\nLearn about hardware, software and networking.",
  },
];

const fileStyles = {
  PDF: {
    icon: FileText,
    color: "text-red-400",
    background: "bg-red-500/10",
  },
  DOC: {
    icon: FileText,
    color: "text-blue-400",
    background: "bg-blue-500/10",
  },
  PPT: {
    icon: Presentation,
    color: "text-orange-400",
    background: "bg-orange-500/10",
  },
  XLS: {
    icon: FileSpreadsheet,
    color: "text-emerald-400",
    background: "bg-emerald-500/10",
  },
};

export default function MyDownloads() {
  const [downloads, setDownloads] = useState(initialDownloads);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [fileType, setFileType] = useState("All");

  const subjects = [
    "All",
    ...new Set(downloads.map((item) => item.subject)),
  ];

  const filteredDownloads = useMemo(() => {
    return downloads.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase());

      const matchesSubject =
        subject === "All" || item.subject === subject;

      const matchesType =
        fileType === "All" || item.type === fileType;

      return matchesSearch && matchesSubject && matchesType;
    });
  }, [downloads, search, subject, fileType]);

  const totalSize = downloads.reduce((total, item) => {
    return total + parseFloat(item.size);
  }, 0);

  const handleDownload = (material) => {
    // Demonstration download.
    // Replace with actual file URL from backend later.
    const blob = new Blob([material.content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${material.title.replace(/\s+/g, "_")}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleRemove = (id) => {
    const confirmed = window.confirm(
      "Remove this item from your download history?"
    );

    if (!confirmed) return;

    setDownloads((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const getFileStyle = (type) => {
    return fileStyles[type] || fileStyles.PDF;
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-7 text-white sm:px-6 lg:px-8">

      {/* Page heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-blue-400">
          Student Workspace / My Downloads
        </p>

        <h1 className="text-2xl font-bold sm:text-3xl">
          My Downloads
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Manage your downloaded notes and learning resources.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <Download className="mb-3 text-blue-400" size={24} />

          <p className="text-sm text-slate-400">
            Total Downloads
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            {downloads.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <HardDrive className="mb-3 text-emerald-400" size={24} />

          <p className="text-sm text-slate-400">
            Total File Size
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            {totalSize.toFixed(1)} MB
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <BookOpen className="mb-3 text-purple-400" size={24} />

          <p className="text-sm text-slate-400">
            Subjects Covered
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            {new Set(downloads.map((item) => item.subject)).size}
          </h2>
        </div>

      </div>

      {/* Search and filters */}
      <div className="mb-7 rounded-xl border border-slate-800 bg-slate-900 p-4">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search downloads..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            {subjects.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Subjects" : item}
              </option>
            ))}
          </select>

          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All File Types</option>
            <option value="PDF">PDF</option>
            <option value="DOC">Word</option>
            <option value="PPT">PowerPoint</option>
            <option value="XLS">Excel</option>
          </select>

        </div>

        <div className="mt-4 flex justify-between text-xs text-slate-500">
          <span>Filter your downloaded resources</span>
          <span>{filteredDownloads.length} results</span>
        </div>

      </div>

      {/* Downloads heading */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          Download History
        </h2>

        <span className="text-xs text-slate-500">
          {downloads.length} files
        </span>
      </div>

      {/* Download list */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        {filteredDownloads.map((item, index) => {
          const style = getFileStyle(item.type);
          const Icon = style.icon;

          return (
            <div
              key={item.id}
              className={`flex flex-col gap-4 p-5 transition hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between ${
                index !== filteredDownloads.length - 1
                  ? "border-b border-slate-800"
                  : ""
              }`}
            >

              <div className="flex min-w-0 items-center gap-4">

                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.background} ${style.color}`}>
                  <Icon size={24} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-blue-400">
                    {item.subject}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span>{item.type}</span>
                    <span>{item.size}</span>

                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {item.date}
                    </span>
                  </div>
                </div>

              </div>

              <div className="flex shrink-0 items-center gap-2">

                <button
                  type="button"
                  onClick={() => handleDownload(item)}
                  title="Download again"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-blue-700 sm:flex-none"
                >
                  <RotateCcw size={16} />
                  Download Again
                </button>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  title="Remove from history"
                  className="rounded-lg border border-slate-700 p-2.5 text-red-400 transition hover:bg-red-500/10"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          );
        })}

        {/* Empty state */}
        {filteredDownloads.length === 0 && (
          <div className="p-12 text-center">

            <FolderOpen
              size={45}
              className="mx-auto mb-4 text-slate-500"
            />

            <h3 className="text-lg font-semibold">
              No downloads found
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Your downloads will appear here when available.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSubject("All");
                setFileType("All");
              }}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold hover:bg-blue-700"
            >
              Reset Filters
            </button>

          </div>
        )}

      </div>

    </div>
  );
}
