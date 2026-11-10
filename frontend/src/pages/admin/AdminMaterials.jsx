
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  FileText,
  File,
  Download,
  Pencil,
  Trash2,
  X,
  UploadCloud,
  BookOpen,
  HardDrive,
  Eye,
} from "lucide-react";

const initialMaterials = [
  {
    id: 1,
    title: "Introduction to Computers",
    subject: "Computer Fundamentals",
    description: "Basic computer concepts, hardware and software.",
    fileName: "introduction-to-computers.pdf",
    size: "2.4 MB",
    type: "PDF",
    status: "Published",
    date: "Nov 03, 2026",
  },
  {
    id: 2,
    title: "Microsoft Word Complete Notes",
    subject: "Microsoft Office",
    description: "Microsoft Word interface, formatting and document creation.",
    fileName: "ms-word-notes.pdf",
    size: "3.1 MB",
    type: "PDF",
    status: "Published",
    date: "Nov 02, 2026",
  },
  {
    id: 3,
    title: "Excel Formulas and Functions",
    subject: "Microsoft Office",
    description: "Learn spreadsheet formulas, functions and calculations.",
    fileName: "excel-formulas.pdf",
    size: "1.8 MB",
    type: "PDF",
    status: "Published",
    date: "Nov 01, 2026",
  },
  {
    id: 4,
    title: "HTML and CSS Fundamentals",
    subject: "Web Development",
    description: "Introduction to HTML elements and CSS styling.",
    fileName: "html-css.pdf",
    size: "4.2 MB",
    type: "PDF",
    status: "Draft",
    date: "Oct 30, 2026",
  },
  {
    id: 5,
    title: "Database Management Notes",
    subject: "Database Management",
    description: "Database concepts, tables, SQL and relationships.",
    fileName: "database-notes.pdf",
    size: "2.7 MB",
    type: "PDF",
    status: "Published",
    date: "Oct 28, 2026",
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
  status: "Published",
  file: null,
};

function MaterialModal({ material, onClose, onSave }) {
  const [form, setForm] = useState(
    material
      ? {
          title: material.title,
          subject: material.subject,
          description: material.description,
          status: material.status,
          file: null,
        }
      : emptyForm
  );

  const [fileError, setFileError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setFileError("Please select a PDF document.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError("The PDF must not exceed 10 MB.");
      event.target.value = "";
      return;
    }

    setFileError("");
    setForm((previous) => ({
      ...previous,
      file: selectedFile,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!material && !form.file) {
      setFileError("Please select a PDF document.");
      return;
    }

    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
      <div className="my-auto w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <h2 className="text-lg font-bold text-white">
              {material ? "Edit Learning Material" : "Upload Learning Material"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Provide the learning resource information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Material Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={150}
              placeholder="Enter material title"
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
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              maxLength={500}
              placeholder="Describe this learning material..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              PDF Document {material ? "(Optional replacement)" : "*"}
            </label>

            <label className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center transition hover:border-blue-500 hover:bg-blue-500/5">
              <UploadCloud size={30} className="text-blue-400" />

              <span className="mt-3 text-sm font-medium text-white">
                {form.file?.name || "Click to select a PDF"}
              </span>

              <span className="mt-1 text-xs text-slate-500">
                PDF only · Maximum 10 MB
              </span>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {fileError && (
              <p className="mt-2 text-xs text-red-400">
                {fileError}
              </p>
            )}

            {material && !form.file && (
              <p className="mt-2 text-xs text-slate-500">
                Current file: {material.fileName}
              </p>
            )}
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
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              {material ? "Save Changes" : "Upload Material"}
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

export default function AdminMaterials() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const publishedCount = materials.filter(
    (material) => material.status === "Published"
  ).length;

  const draftCount = materials.filter(
    (material) => material.status === "Draft"
  ).length;

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSearch = [
        material.title,
        material.subject,
        material.fileName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || material.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [materials, search, filter]);

  function handleSave(form) {
    if (editingMaterial) {
      setMaterials((previous) =>
        previous.map((material) =>
          material.id === editingMaterial.id
            ? {
                ...material,
                title: form.title.trim(),
                subject: form.subject,
                description: form.description.trim(),
                status: form.status,
                ...(form.file && {
                  fileName: form.file.name,
                  size: `${(form.file.size / (1024 * 1024)).toFixed(1)} MB`,
                }),
              }
            : material
        )
      );
    } else {
      const newMaterial = {
        id: Date.now(),
        title: form.title.trim(),
        subject: form.subject,
        description: form.description.trim(),
        fileName: form.file.name,
        size: `${(form.file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: "PDF",
        status: form.status,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      setMaterials((previous) => [newMaterial, ...previous]);
    }

    setModalOpen(false);
    setEditingMaterial(null);
  }

  function handleDelete(material) {
    const confirmed = window.confirm(
      `Delete "${material.title}"?`
    );

    if (!confirmed) return;

    setMaterials((previous) =>
      previous.filter((item) => item.id !== material.id)
    );
  }

  function openEdit(material) {
    setEditingMaterial(material);
    setModalOpen(true);
  }

  function openAdd() {
    setEditingMaterial(null);
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen space-y-7 bg-slate-950 text-white">

      {/* Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-400">
            ACADEMIC MANAGEMENT
          </p>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            Learning Materials
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Upload, organize and manage student learning resources.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
        >
          <Plus size={19} />
          Upload Material
        </button>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Materials"
          value={materials.length}
          icon={FileText}
          color="bg-blue-500/10 text-blue-400"
        />
        <StatCard
          title="Published Materials"
          value={publishedCount}
          icon={BookOpen}
          color="bg-emerald-500/10 text-emerald-400"
        />
        <StatCard
          title="Draft Materials"
          value={draftCount}
          icon={HardDrive}
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
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search materials or subjects..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Published", "Draft"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 text-sm transition ${
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

      {/* Materials table */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <h2 className="font-semibold">All Learning Materials</h2>
            <p className="mt-1 text-xs text-slate-400">
              {filteredMaterials.length} resources found
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-950/60 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium">Material</th>
                <th className="px-5 py-4 font-medium">Subject</th>
                <th className="px-5 py-4 font-medium">File Size</th>
                <th className="px-5 py-4 font-medium">Date Added</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredMaterials.map((material) => (
                <tr
                  key={material.id}
                  className="transition hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                        <FileText size={22} />
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          {material.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {material.fileName}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {material.subject}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {material.size}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {material.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        material.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-orange-500/10 text-orange-400"
                      }`}
                    >
                      {material.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(material)}
                        aria-label={`Edit ${material.title}`}
                        className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:border-blue-500 hover:text-blue-400"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(material)}
                        aria-label={`Delete ${material.title}`}
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

          {filteredMaterials.length === 0 && (
            <div className="p-12 text-center">
              <File size={35} className="mx-auto text-slate-600" />
              <p className="mt-3 font-semibold text-white">
                No materials found
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Try another search or upload a new material.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <MaterialModal
          material={editingMaterial}
          onClose={() => {
            setModalOpen(false);
            setEditingMaterial(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
