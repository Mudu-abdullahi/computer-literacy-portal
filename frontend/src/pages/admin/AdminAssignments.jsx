
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  ClipboardList,
  Clock,
  CheckCircle,
  Users,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  FileText,
  Eye,
} from "lucide-react";

const initialAssignments = [
  {
    id: 1,
    title: "Computer Hardware Assignment",
    subject: "Computer Fundamentals",
    description: "Identify and explain five major computer hardware components.",
    dueDate: "2026-11-12",
    status: "Published",
    submissions: 32,
    totalStudents: 45,
  },
  {
    id: 2,
    title: "Microsoft Word Practical",
    subject: "Microsoft Office",
    description: "Create and format a professional business letter.",
    dueDate: "2026-11-15",
    status: "Published",
    submissions: 25,
    totalStudents: 45,
  },
  {
    id: 3,
    title: "Excel Formulas Exercise",
    subject: "Microsoft Office",
    description: "Complete the spreadsheet exercises using Excel formulas.",
    dueDate: "2026-11-20",
    status: "Draft",
    submissions: 0,
    totalStudents: 45,
  },
  {
    id: 4,
    title: "HTML Website Project",
    subject: "Web Development",
    description: "Build a simple personal website using HTML and CSS.",
    dueDate: "2026-11-25",
    status: "Published",
    submissions: 18,
    totalStudents: 45,
  },
];

const subjects = [
  "Computer Fundamentals",
  "Microsoft Office",
  "Database Management",
  "Web Development",
  "Computer Networking",
  "Internet and Email",
];

const emptyForm = {
  title: "",
  subject: subjects[0],
  description: "",
  dueDate: "",
  status: "Draft",
};

function AssignmentModal({ assignment, onClose, onSave }) {
  const [form, setForm] = useState(
    assignment
      ? {
          title: assignment.title,
          subject: assignment.subject,
          description: assignment.description,
          dueDate: assignment.dueDate,
          status: assignment.status,
        }
      : emptyForm
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.dueDate) return;

    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
      <div className="my-auto w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <h2 className="text-lg font-bold text-white">
              {assignment ? "Edit Assignment" : "Create Assignment"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Enter the assignment details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Assignment Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={150}
              placeholder="Enter assignment title"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Subject *
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Instructions *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              maxLength={2000}
              placeholder="Explain what students should do..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Submission Deadline *
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              {assignment ? "Save Changes" : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
        <Icon size={21} />
      </div>
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-1 text-2xl font-bold text-white">{value}</h3>
    </div>
  );
}

export default function AdminAssignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [viewingAssignment, setViewingAssignment] = useState(null);

  const publishedCount = assignments.filter(
    (item) => item.status === "Published"
  ).length;

  const totalSubmissions = assignments.reduce(
    (total, item) => total + item.submissions,
    0
  );

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesSearch = [
        item.title,
        item.subject,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [assignments, search, filter]);

  function handleSave(form) {
    if (editingAssignment) {
      setAssignments((previous) =>
        previous.map((item) =>
          item.id === editingAssignment.id
            ? { ...item, ...form }
            : item
        )
      );
    } else {
      setAssignments((previous) => [
        {
          ...form,
          id: Date.now(),
          submissions: 0,
          totalStudents: 45,
        },
        ...previous,
      ]);
    }

    setModalOpen(false);
    setEditingAssignment(null);
  }

  function handleDelete(assignment) {
    const confirmed = window.confirm(
      `Delete "${assignment.title}"?`
    );

    if (!confirmed) return;

    setAssignments((previous) =>
      previous.filter((item) => item.id !== assignment.id)
    );
  }

  function openAdd() {
    setEditingAssignment(null);
    setModalOpen(true);
  }

  function openEdit(assignment) {
    setEditingAssignment(assignment);
    setModalOpen(true);
  }

  function formatDate(date) {
    if (!date) return "Not set";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-KE",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  }

  return (
    <div className="min-h-screen space-y-7 bg-slate-950 text-white">

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-400">
            ACADEMIC MANAGEMENT
          </p>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            Assignments
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Create assignments and monitor student submissions.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
        >
          <Plus size={19} />
          Create Assignment
        </button>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Assignments"
          value={assignments.length}
          icon={ClipboardList}
          color="bg-blue-500/10 text-blue-400"
        />

        <StatCard
          title="Published Assignments"
          value={publishedCount}
          icon={CheckCircle}
          color="bg-emerald-500/10 text-emerald-400"
        />

        <StatCard
          title="Student Submissions"
          value={totalSubmissions}
          icon={Users}
          color="bg-purple-500/10 text-purple-400"
        />
      </section>

      {/* Search and filters */}
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search assignments..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Published", "Draft"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 text-sm ${
                filter === item
                  ? "bg-blue-600 text-white"
                  : "border border-slate-700 text-slate-400 hover:bg-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Assignments table */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-5">
          <h2 className="font-semibold">All Assignments</h2>
          <p className="mt-1 text-xs text-slate-400">
            {filteredAssignments.length} assignments found
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-950/60 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium">Assignment</th>
                <th className="px-5 py-4 font-medium">Subject</th>
                <th className="px-5 py-4 font-medium">Deadline</th>
                <th className="px-5 py-4 font-medium">Submissions</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredAssignments.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Assignment #{item.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {item.subject}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CalendarDays size={15} />
                      {formatDate(item.dueDate)}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        {item.submissions}
                      </span>
                      <span className="text-xs text-slate-500">
                        / {item.totalStudents}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{
                          width: `${
                            item.totalStudents
                              ? Math.min(
                                  100,
                                  (item.submissions / item.totalStudents) * 100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-orange-500/10 text-orange-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setViewingAssignment(item)}
                        aria-label={`View ${item.title}`}
                        className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:border-emerald-500 hover:text-emerald-400"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        aria-label={`Edit ${item.title}`}
                        className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:border-blue-500 hover:text-blue-400"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        aria-label={`Delete ${item.title}`}
                        className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAssignments.length === 0 && (
            <div className="p-12 text-center">
              <ClipboardList size={35} className="mx-auto text-slate-600" />
              <p className="mt-3 font-semibold text-white">
                No assignments found
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Try another search or create an assignment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Assignment details */}
      {viewingAssignment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                Assignment Details
              </h2>
              <button
                type="button"
                onClick={() => setViewingAssignment(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="mt-6 text-xl font-bold text-blue-400">
              {viewingAssignment.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              {viewingAssignment.description}
            </p>

            <div className="mt-6 space-y-4 border-t border-slate-800 pt-5 text-sm">
              <p className="text-slate-400">
                Subject: <span className="text-white">{viewingAssignment.subject}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <Clock size={16} />
                Deadline: <span className="text-white">{formatDate(viewingAssignment.dueDate)}</span>
              </p>
              <p className="text-slate-400">
                Submissions: <span className="text-white">{viewingAssignment.submissions} / {viewingAssignment.totalStudents}</span>
              </p>
              <p className="text-slate-400">
                Status: <span className="text-white">{viewingAssignment.status}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setViewingAssignment(null)}
              className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {modalOpen && (
        <AssignmentModal
          assignment={editingAssignment}
          onClose={() => {
            setModalOpen(false);
            setEditingAssignment(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
