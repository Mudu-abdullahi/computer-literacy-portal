
import { useEffect, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  Clock,
  UserX,
  RefreshCw,
  CheckCircle,
  XCircle,
  Mail,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState("");

  // Load students when the page opens.
  useEffect(() => {
    let ignore = false;

    async function loadInitialStudents() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please log in as an administrator.");
        }

        const response = await fetch(`${API_URL}/admin/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to retrieve students."
          );
        }

        if (!ignore) {
          setStudents(data.students || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadInitialStudents();

    return () => {
      ignore = true;
    };
  }, []);

  // Refresh the student list.
  async function fetchStudents() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in as an administrator.");
      }

      const response = await fetch(`${API_URL}/admin/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to retrieve students."
        );
      }

      setStudents(data.students || []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // Approve or deactivate a student.
  async function updateStudent(id, action) {
    const actionLabel =
      action === "approve" ? "approve" : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${actionLabel} this student?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(`${id}-${action}`);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in as an administrator.");
      }

      const response = await fetch(
        `${API_URL}/admin/students/${id}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update student."
        );
      }

      await fetchStudents();

      window.alert(data.message || "Student updated successfully.");
    } catch (err) {
      window.alert(err.message || "Something went wrong.");
    } finally {
      setActionLoading("");
    }
  }

  // Search and filter students.
  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    const fullName = (student.fullName || "").toLowerCase();
    const email = (student.email || "").toLowerCase();

    const matchesSearch =
      fullName.includes(query) || email.includes(query);

    const matchesStatus =
      statusFilter === "all" ||
      student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate student statistics.
  const pendingCount = students.filter(
    (student) => student.status === "pending"
  ).length;

  const activeCount = students.filter(
    (student) => student.status === "active"
  ).length;

  const inactiveCount = students.filter(
    (student) => student.status === "inactive"
  ).length;

  return (
    <div className="space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            User Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-800">
            Students
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage student accounts and registration requests.
          </p>
        </div>

        <button
          onClick={fetchStudents}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />

          <div>
            <p className="font-semibold">Unable to load students</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Students"
          value={students.length}
          icon={Users}
          color="blue"
        />

        <SummaryCard
          title="Active Students"
          value={activeCount}
          icon={UserCheck}
          color="green"
        />

        <SummaryCard
          title="Pending Approval"
          value={pendingCount}
          icon={Clock}
          color="amber"
        />

        <SummaryCard
          title="Inactive Students"
          value={inactiveCount}
          icon={UserX}
          color="red"
        />
      </div>

      {/* Student table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Table heading */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Student Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage registered students.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="all">All Students</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center px-5 py-16">
            <RefreshCw
              size={30}
              className="animate-spin text-blue-600"
            />

            <p className="mt-4 text-sm text-slate-500">
              Loading students...
            </p>
          </div>
        ) : error ? (
          <div className="px-5 py-14 text-center">
            <p className="text-sm text-slate-500">
              Student records could not be displayed.
            </p>

            <button
              onClick={fetchStudents}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Users
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-700">
              No students found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Student
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Email Address
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Registration Date
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Student name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                          {(student.fullName || "S")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {student.fullName}
                          </p>

                          <p className="text-xs text-slate-400">
                            Student
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail
                          size={15}
                          className="text-slate-400"
                        />

                        {student.email}
                      </div>
                    </td>

                    {/* Registration date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays
                          size={15}
                          className="text-slate-400"
                        />

                        {student.createdAt
                          ? new Date(
                              student.createdAt
                            ).toLocaleDateString()
                          : "Not available"}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge status={student.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {student.status !== "active" && (
                          <button
                            onClick={() =>
                              updateStudent(
                                student._id,
                                "approve"
                              )
                            }
                            disabled={
                              actionLoading ===
                              `${student._id}-approve`
                            }
                            title="Approve student"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100 disabled:opacity-50"
                          >
                            <CheckCircle size={15} />

                            {actionLoading ===
                            `${student._id}-approve`
                              ? "Processing..."
                              : "Approve"}
                          </button>
                        )}

                        {student.status === "active" && (
                          <button
                            onClick={() =>
                              updateStudent(
                                student._id,
                                "deactivate"
                              )
                            }
                            disabled={
                              actionLoading ===
                              `${student._id}-deactivate`
                            }
                            title="Deactivate student"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            <XCircle size={15} />

                            {actionLoading ===
                            `${student._id}-deactivate`
                              ? "Processing..."
                              : "Deactivate"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table footer */}
        {!loading && !error && (
          <div className="border-t border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredStudents.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {students.length}
              </span>{" "}
              students
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable statistics card.
function SummaryCard({ title, value, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}
        >
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}

// Reusable student status badge.
function StatusBadge({ status }) {
  const styles = {
    active: "bg-green-50 text-green-700",
    pending: "bg-amber-50 text-amber-700",
    inactive: "bg-red-50 text-red-700",
  };

  const labels = {
    active: "Active",
    pending: "Pending",
    inactive: "Inactive",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {labels[status] || status || "Unknown"}
    </span>
  );
}
