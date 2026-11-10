
import { useMemo, useState } from "react";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Calendar,
  Upload,
  FileText,
  X,
  Send,
} from "lucide-react";

const initialAssignments = [
  {
    id: 1,
    title: "Microsoft Word Practical",
    subject: "Computer Packages",
    description:
      "Create a professional business letter using Microsoft Word. Apply proper formatting, margins, headings and page numbering.",
    instructions: [
      "Create a new Word document.",
      "Prepare a professional business letter.",
      "Use appropriate fonts and formatting.",
      "Include page numbers.",
      "Save your document as a PDF.",
    ],
    dueDate: "2026-11-20",
    totalMarks: 20,
    status: "Pending",
  },
  {
    id: 2,
    title: "Excel Formulas and Functions",
    subject: "Microsoft Excel",
    description:
      "Prepare a spreadsheet containing student records and demonstrate the use of basic Excel formulas.",
    instructions: [
      "Create a student marks spreadsheet.",
      "Use SUM to calculate total marks.",
      "Use AVERAGE to calculate average marks.",
      "Use MAX and MIN functions.",
      "Format your spreadsheet professionally.",
    ],
    dueDate: "2026-11-15",
    totalMarks: 30,
    status: "Pending",
  },
  {
    id: 3,
    title: "Computer Hardware Research",
    subject: "Introduction to IT",
    description:
      "Research computer hardware components and explain their functions.",
    instructions: [
      "Explain five computer hardware components.",
      "Describe their functions.",
      "Include relevant examples.",
      "Submit your work as a PDF or Word document.",
    ],
    dueDate: "2026-11-25",
    totalMarks: 25,
    status: "Pending",
  },
  {
    id: 4,
    title: "PowerPoint Presentation",
    subject: "Computer Packages",
    description:
      "Prepare a presentation about the importance of information technology in modern society.",
    instructions: [
      "Create at least 8 slides.",
      "Use appropriate slide layouts.",
      "Include images and illustrations.",
      "Apply suitable transitions.",
    ],
    dueDate: "2026-11-30",
    totalMarks: 25,
    status: "Submitted",
    submittedFile: "IT_Presentation.pptx",
  },
];

export default function Assignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const getStatus = (assignment) => {
    if (assignment.status === "Submitted") return "Submitted";
    if (assignment.dueDate < today) return "Overdue";
    return "Pending";
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(search.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(search.toLowerCase());

      const status = getStatus(assignment);
      const matchesFilter = filter === "All" || status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [assignments, search, filter]);

  const submittedCount = assignments.filter(
    (a) => getStatus(a) === "Submitted"
  ).length;

  const pendingCount = assignments.filter(
    (a) => getStatus(a) === "Pending"
  ).length;

  const overdueCount = assignments.filter(
    (a) => getStatus(a) === "Overdue"
  ).length;

  const openAssignment = (assignment) => {
    setSelected(assignment);
    setSelectedFile(null);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Please select a file before submitting.");
      return;
    }

    setAssignments((previous) =>
      previous.map((assignment) =>
        assignment.id === selected.id
          ? {
              ...assignment,
              status: "Submitted",
              submittedFile: selectedFile.name,
              submittedAt: new Date().toISOString(),
            }
          : assignment
      )
    );

    setSelected(null);
    setSelectedFile(null);
    setMessage("");
  };

  const statusStyles = {
    Submitted: "bg-emerald-500/10 text-emerald-400",
    Pending: "bg-amber-500/10 text-amber-400",
    Overdue: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-7 text-white sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-blue-400">
          Student Workspace / Assignments
        </p>

        <h1 className="text-2xl font-bold sm:text-3xl">
          My Assignments
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          View your assignments, follow deadlines and submit your work.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <ClipboardList className="mb-3 text-blue-400" size={24} />
          <p className="text-sm text-slate-400">Total Assignments</p>
          <h2 className="mt-1 text-3xl font-bold">
            {assignments.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <Clock className="mb-3 text-amber-400" size={24} />
          <p className="text-sm text-slate-400">Pending</p>
          <h2 className="mt-1 text-3xl font-bold">
            {pendingCount}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <CheckCircle className="mb-3 text-emerald-400" size={24} />
          <p className="text-sm text-slate-400">Submitted</p>
          <h2 className="mt-1 text-3xl font-bold">
            {submittedCount}
          </h2>
        </div>

      </div>

      {/* Overdue notification */}
      {overdueCount > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <AlertCircle className="shrink-0 text-red-400" size={22} />
          <p className="text-sm text-red-300">
            You have {overdueCount} overdue assignment(s). Please review them.
          </p>
        </div>
      )}

      {/* Search and filter */}
      <div className="mb-7 flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:flex-row">

        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
        >
          <option value="All">All Assignments</option>
          <option value="Pending">Pending</option>
          <option value="Submitted">Submitted</option>
          <option value="Overdue">Overdue</option>
        </select>

      </div>

      {/* Assignment list */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Available Assignments</h2>
        <span className="text-sm text-slate-500">
          {filteredAssignments.length} results
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {filteredAssignments.map((assignment) => {
          const status = getStatus(assignment);

          return (
            <div
              key={assignment.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
            >

              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <FileText size={24} />
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
                  {status}
                </span>
              </div>

              <p className="mb-2 text-xs text-blue-400">
                {assignment.subject}
              </p>

              <h3 className="text-lg font-bold">
                {assignment.title}
              </h3>

              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
                {assignment.description}
              </p>

              <div className="my-5 flex flex-wrap gap-5 border-t border-slate-800 pt-4 text-xs text-slate-400">

                <span className="flex items-center gap-2">
                  <Calendar size={15} />
                  Due: {assignment.dueDate}
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle size={15} />
                  {assignment.totalMarks} Marks
                </span>

              </div>

              {assignment.submittedFile && (
                <p className="mb-4 truncate text-xs text-emerald-400">
                  Submitted file: {assignment.submittedFile}
                </p>
              )}

              <button
                type="button"
                onClick={() => openAssignment(assignment)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold transition hover:bg-blue-700"
              >
                {status === "Submitted" ? "View Submission" : "View Assignment"}
              </button>

            </div>
          );
        })}

      </div>

      {/* Empty state */}
      {filteredAssignments.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
          <ClipboardList className="mx-auto mb-4 text-slate-500" size={40} />

          <h3 className="text-lg font-semibold">
            No assignments found
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Try changing your search or filter.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setFilter("All");
            }}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Assignment modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900">

            <div className="sticky top-0 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-5">

              <div>
                <h2 className="text-lg font-bold">
                  {selected.title}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {selected.subject}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                aria-label="Close assignment"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
              >
                <X size={21} />
              </button>

            </div>

            <div className="space-y-6 p-5">

              <div>
                <h3 className="mb-2 font-semibold">
                  Assignment Description
                </h3>

                <p className="text-sm leading-7 text-slate-400">
                  {selected.description}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Deadline
                  </span>

                  <span className="font-semibold text-white">
                    {selected.dueDate}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Total Marks
                  </span>

                  <span className="font-semibold text-white">
                    {selected.totalMarks}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">
                  Instructions
                </h3>

                <ol className="space-y-3">
                  {selected.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm text-slate-400"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs text-blue-400">
                        {index + 1}
                      </span>

                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              {selected.status === "Submitted" ? (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <CheckCircle className="mb-2 text-emerald-400" size={24} />

                  <h3 className="font-semibold text-emerald-400">
                    Assignment Submitted
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    File: {selected.submittedFile}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Your assignment has been submitted in this demonstration.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                  <div>
                    <label className="mb-3 block text-sm font-semibold">
                      Upload Your Assignment
                    </label>

                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 p-7 text-center transition hover:border-blue-500">

                      <Upload className="mb-3 text-blue-400" size={30} />

                      <span className="text-sm font-semibold">
                        Choose your assignment file
                      </span>

                      <span className="mt-2 text-xs text-slate-500">
                        PDF, DOC, DOCX, PPT or XLS files
                      </span>

                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                        className="hidden"
                        onChange={(e) => {
                          setSelectedFile(e.target.files?.[0] || null);
                          setMessage("");
                        }}
                      />
                    </label>

                    {selectedFile && (
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-800 p-3">
                        <span className="truncate text-sm text-emerald-400">
                          {selectedFile.name}
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="ml-3 text-red-400"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  {message && (
                    <p className="text-sm text-red-400">
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold hover:bg-blue-700"
                  >
                    <Send size={17} />
                    Submit Assignment
                  </button>

                </form>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
