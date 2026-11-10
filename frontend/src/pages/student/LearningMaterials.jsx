
import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  Presentation,
  Eye,
  X,
  Filter,
  Calendar,
  HardDrive,
} from "lucide-react";

const materials = [
  {
    id: 1,
    title: "Introduction to Computers",
    subject: "Computer Packages",
    type: "PDF",
    size: "2.4 MB",
    date: "2026-10-20",
    description: "Learn computer fundamentals, components, characteristics and applications.",
    content: `INTRODUCTION TO COMPUTERS

1. What is a Computer?
A computer is an electronic device that accepts data, processes it and produces meaningful information.

2. Characteristics of Computers
- Speed
- Accuracy
- Storage
- Reliability
- Automation

3. Main Components
- Input devices
- Processing unit
- Output devices
- Storage devices

4. Examples of Computers
- Desktop computers
- Laptops
- Tablets
- Smartphones`,
  },
  {
    id: 2,
    title: "Microsoft Word Notes",
    subject: "Computer Packages",
    type: "PDF",
    size: "3.1 MB",
    date: "2026-10-22",
    description: "Learn document creation, formatting, tables and page layout.",
    content: `MICROSOFT WORD NOTES

1. Introduction
Microsoft Word is a word processing application used to create and edit documents.

2. Basic Features
- Creating documents
- Formatting text
- Inserting pictures
- Creating tables
- Page numbering

3. Common Shortcuts
- Ctrl + C: Copy
- Ctrl + V: Paste
- Ctrl + X: Cut
- Ctrl + S: Save
- Ctrl + B: Bold`,
  },
  {
    id: 3,
    title: "Microsoft Excel Fundamentals",
    subject: "Microsoft Excel",
    type: "PDF",
    size: "2.8 MB",
    date: "2026-10-24",
    description: "Understand worksheets, formulas, functions and spreadsheet formatting.",
    content: `MICROSOFT EXCEL FUNDAMENTALS

1. Introduction
Excel is a spreadsheet application used to organize and analyze data.

2. Important Terms
- Workbook
- Worksheet
- Rows
- Columns
- Cells

3. Basic Formulas
=SUM(A1:A10)
=AVERAGE(A1:A10)
=MAX(A1:A10)
=MIN(A1:A10)

4. Applications
- Budget preparation
- Data analysis
- Record keeping`,
  },
  {
    id: 4,
    title: "PowerPoint Presentation Guide",
    subject: "Computer Packages",
    type: "PPT",
    size: "5.2 MB",
    date: "2026-10-25",
    description: "Learn how to create professional presentations and use slide transitions.",
    content: `MICROSOFT POWERPOINT GUIDE

1. Introduction
PowerPoint is presentation software used to communicate information through slides.

2. Main Features
- Slide creation
- Themes and layouts
- Images and graphics
- Animations
- Transitions

3. Presentation Tips
- Use readable fonts
- Keep slides simple
- Use relevant images
- Avoid excessive animations`,
  },
  {
    id: 5,
    title: "Introduction to Information Technology",
    subject: "Introduction to IT",
    type: "DOC",
    size: "1.6 MB",
    date: "2026-10-27",
    description: "Understand information technology, hardware, software and networking.",
    content: `INTRODUCTION TO INFORMATION TECHNOLOGY

1. What is IT?
Information Technology involves the use of computers and communication systems to manage information.

2. Computer Hardware
Physical components of a computer.

3. Computer Software
Programs and instructions used by computers.

4. Computer Networks
Networks allow computers to communicate and share resources.`,
  },
  {
    id: 6,
    title: "Computer Security Basics",
    subject: "Introduction to IT",
    type: "PDF",
    size: "2.0 MB",
    date: "2026-10-28",
    description: "Learn password security, malware protection and safe internet practices.",
    content: `COMPUTER SECURITY BASICS

1. Computer Security
Protecting computer systems and information from unauthorized access.

2. Common Threats
- Viruses
- Malware
- Phishing
- Unauthorized access

3. Security Practices
- Use strong passwords
- Enable multi-factor authentication
- Install security updates
- Avoid suspicious links`,
  },
];

const fileStyles = {
  PDF: {
    icon: FileText,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  DOC: {
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  PPT: {
    icon: Presentation,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  XLS: {
    icon: FileSpreadsheet,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
};

export default function LearningMaterials() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [fileType, setFileType] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const subjects = [
    "All",
    ...new Set(materials.map((item) => item.subject)),
  ];

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesSubject =
        subject === "All" || item.subject === subject;

      const matchesType =
        fileType === "All" || item.type === fileType;

      return matchesSearch && matchesSubject && matchesType;
    });
  }, [search, subject, fileType]);

  const handleDownload = (material) => {
    // Demonstration download.
    // Later, this will download the actual file from the backend.
    const content = `${material.title}\n\nSubject: ${material.subject}\n\n${material.description}\n\n${material.content}`;

    const blob = new Blob([content], {
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

  const getFileStyle = (type) => {
    return fileStyles[type] || fileStyles.PDF;
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-7 text-white sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-blue-400">
          Student Workspace / Learning Materials
        </p>

        <h1 className="text-2xl font-bold sm:text-3xl">
          Learning Materials
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Access your notes, study resources and learning documents.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <BookOpen className="mb-3 text-blue-400" size={24} />
          <p className="text-sm text-slate-400">Total Materials</p>
          <h2 className="mt-1 text-3xl font-bold">
            {materials.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <FileText className="mb-3 text-red-400" size={24} />
          <p className="text-sm text-slate-400">PDF Documents</p>
          <h2 className="mt-1 text-3xl font-bold">
            {materials.filter((m) => m.type === "PDF").length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <HardDrive className="mb-3 text-emerald-400" size={24} />
          <p className="text-sm text-slate-400">Available Resources</p>
          <h2 className="mt-1 text-3xl font-bold">
            {materials.length}
          </h2>
        </div>

      </div>

      {/* Search and filters */}
      <div className="mb-7 rounded-xl border border-slate-800 bg-slate-900 p-4">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          <div className="relative lg:col-span-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search learning materials..."
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

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <Filter size={14} />
            Filter your learning resources
          </span>

          <span>
            {filteredMaterials.length} results
          </span>
        </div>
      </div>

      {/* Materials list */}
      <div className="mb-5">
        <h2 className="text-lg font-bold">
          Available Materials
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredMaterials.map((material) => {
          const style = getFileStyle(material.type);
          const Icon = style.icon;

          return (
            <div
              key={material.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500/40"
            >

              <div className="mb-5 flex items-center justify-between">

                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.bg} ${style.color}`}>
                  <Icon size={25} />
                </div>

                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                  {material.type}
                </span>

              </div>

              <p className="mb-2 text-xs font-medium text-blue-400">
                {material.subject}
              </p>

              <h3 className="min-h-12 text-lg font-bold">
                {material.title}
              </h3>

              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                {material.description}
              </p>

              <div className="my-5 flex flex-wrap gap-4 border-t border-slate-800 pt-4 text-xs text-slate-500">

                <span className="flex items-center gap-1.5">
                  <HardDrive size={14} />
                  {material.size}
                </span>

                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {material.date}
                </span>

              </div>

              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() => setSelectedMaterial(material)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  <Eye size={16} />
                  Preview
                </button>

                <button
                  onClick={() => handleDownload(material)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Download size={16} />
                  Download
                </button>

              </div>

            </div>
          );
        })}

      </div>

      {/* Empty state */}
      {filteredMaterials.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
          <Search className="mx-auto mb-4 text-slate-500" size={40} />

          <h3 className="text-lg font-semibold">
            No materials found
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Try changing your search or filters.
          </p>

          <button
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

      {/* Preview modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">

          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900">

            <div className="sticky top-0 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-5">

              <div>
                <h2 className="font-bold text-white">
                  {selectedMaterial.title}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {selectedMaterial.subject}
                </p>
              </div>

              <button
                onClick={() => setSelectedMaterial(null)}
                aria-label="Close preview"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
              >
                <X size={21} />
              </button>

            </div>

            <div className="whitespace-pre-wrap p-6 text-sm leading-7 text-slate-300">
              {selectedMaterial.content}
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-800 p-5 sm:flex-row">

              <button
                onClick={() => handleDownload(selectedMaterial)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold hover:bg-blue-700"
              >
                <Download size={17} />
                Download Notes
              </button>

              <button
                onClick={() => setSelectedMaterial(null)}
                className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold hover:bg-slate-800"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
