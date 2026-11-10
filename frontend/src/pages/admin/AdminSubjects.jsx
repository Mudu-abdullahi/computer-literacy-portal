
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  BookOpen,
  Pencil,
  Trash2,
  X,
  GraduationCap,
  Monitor,
  Database,
  Code,
  Network,
  FileSpreadsheet,
  ChevronDown,
  BookMarked,
  Layers,
} from "lucide-react";

const initialSubjects = [
  {
    id: 1,
    name: "Computer Fundamentals",
    code: "CFL101",
    category: "Basic Computing",
    description: "Introduction to computers, hardware, software and operating systems.",
    materials: 12,
    status: "Published",
    icon: Monitor,
    color: "blue",
  },
  {
    id: 2,
    name: "Microsoft Office",
    code: "CFL102",
    category: "Office Applications",
    description: "Learn Microsoft Word, Excel, PowerPoint and other office applications.",
    materials: 18,
    status: "Published",
    icon: FileSpreadsheet,
    color: "emerald",
  },
  {
    id: 3,
    name: "Database Management",
    code: "CFL103",
    category: "Database",
    description: "Introduction to database concepts, SQL and database management.",
    materials: 9,
    status: "Published",
    icon: Database,
    color: "purple",
  },
  {
    id: 4,
    name: "Web Development",
    code: "CFL104",
    category: "Programming",
    description: "Learn HTML, CSS, JavaScript and modern web development.",
    materials: 15,
    status: "Published",
    icon: Code,
    color: "orange",
  },
  {
    id: 5,
    name: "Computer Networking",
    code: "CFL105",
    category: "Networking",
    description: "Understand networking fundamentals, devices and protocols.",
    materials: 8,
    status: "Draft",
    icon: Network,
    color: "cyan",
  },
  {
    id: 6,
    name: "Internet and Email",
    code: "CFL106",
    category: "Basic Computing",
    description: "Internet usage, online safety and professional email communication.",
    materials: 10,
    status: "Published",
    icon: BookMarked,
    color: "pink",
  },
];

const emptyForm = {
  name: "",
  code: "",
  category: "Basic Computing",
  description: "",
  status: "Published",
};

const colorStyles = {
  blue: "bg-blue-500/10 text-blue-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  purple: "bg-purple-500/10 text-purple-400",
  orange: "bg-orange-500/10 text-orange-400",
  cyan: "bg-cyan-500/10 text-cyan-400",
  pink: "bg-pink-500/10 text-pink-400",
};

const categories = [
  "Basic Computing",
  "Office Applications",
  "Programming",
  "Database",
  "Networking",
  "Cybersecurity",
  "Other",
];

function SubjectModal({ subject, onClose, onSave }) {
  const [form, setForm] = useState(
    subject
      ? {
          name: subject.name,
          code: subject.code,
          category: subject.category,
          description: subject.description,
          status: subject.status,
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

    if (!form.name.trim() || !form.code.trim()) return;

    onSave({
      ...form,
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      description: form.description.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
      <div className="my-auto w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <h2 className="text-lg font-bold text-white">
              {subject ? "Edit Subject" : "Add New Subject"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Enter the subject information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Subject Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="e.g. Computer Fundamentals"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Subject Code *
              </label>
              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                required
                maxLength={20}
                placeholder="e.g. CFL101"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              maxLength={500}
              placeholder="Describe what students will learn..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Publication Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              {subject ? "Save Changes" : "Create Subject"}
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

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch = [
        subject.name,
        subject.code,
        subject.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || subject.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [subjects, search, filter]);

  const publishedCount = subjects.filter(
    (subject) => subject.status === "Published"
  ).length;

  const draftCount = subjects.filter(
    (subject) => subject.status === "Draft"
  ).length;

  function openAddModal() {
    setEditingSubject(null);
    setModalOpen(true);
  }

  function openEditModal(subject) {
    setEditingSubject(subject);
    setModalOpen(true);
  }

  function handleSave(formData) {
    if (editingSubject) {
      setSubjects((previous) =>
        previous.map((subject) =>
          subject.id === editingSubject.id
            ? { ...subject, ...formData }
            : subject
        )
      );
    } else {
      const newSubject = {
        ...formData,
        id: Date.now(),
        materials: 0,
        icon: GraduationCap,
        color: "blue",
      };

      setSubjects((previous) => [newSubject, ...previous]);
    }

    setModalOpen(false);
    setEditingSubject(null);
  }

  function handleDelete(subject) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${subject.name}"?`
    );

    if (!confirmed) return;

    setSubjects((previous) =>
      previous.filter((item) => item.id !== subject.id)
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
            Subjects Management
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Create, organize and manage computer literacy subjects.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <Plus size={19} />
          Add New Subject
        </button>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Subjects"
          value={subjects.length}
          icon={BookOpen}
          color="bg-blue-500/10 text-blue-400"
        />
        <StatCard
          title="Published Subjects"
          value={publishedCount}
          icon={GraduationCap}
          color="bg-emerald-500/10 text-emerald-400"
        />
        <StatCard
          title="Draft Subjects"
          value={draftCount}
          icon={Layers}
          color="bg-orange-500/10 text-orange-400"
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
            placeholder="Search subjects, codes or categories..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Published", "Draft"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
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

      {/* Subject cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Subjects</h2>
          <span className="text-sm text-slate-500">
            {filteredSubjects.length} subjects found
          </span>
        </div>

        {filteredSubjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">
            <BookOpen size={36} className="mx-auto text-slate-600" />
            <h3 className="mt-4 font-semibold text-white">
              No subjects found
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Try another search or create a new subject.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredSubjects.map((subject) => {
              const Icon = subject.icon || GraduationCap;

              return (
                <article
                  key={subject.id}
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        colorStyles[subject.color] || colorStyles.blue
                      }`}
                    >
                      <Icon size={23} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        subject.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-orange-500/10 text-orange-400"
                      }`}
                    >
                      {subject.status}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      {subject.code}
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-white">
                      {subject.name}
                    </h3>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                      {subject.description || "No description provided."}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <BookOpen size={15} />
                      {subject.materials} Materials
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(subject)}
                        aria-label={`Edit ${subject.name}`}
                        className="rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:border-blue-500 hover:text-blue-400"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(subject)}
                        aria-label={`Delete ${subject.name}`}
                        className="rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Category: {subject.category}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Add/Edit modal */}
      {modalOpen && (
        <SubjectModal
          subject={editingSubject}
          onClose={() => {
            setModalOpen(false);
            setEditingSubject(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
