
import { useState } from "react";
import { useAuth } from "../../context/useAuth";

import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Edit3,
  Save,
  X,
  Lock,
  ShieldCheck,
  Camera,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function MyProfile() {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    studentId: user?.studentId || "Not assigned",
    course: user?.course || "Computer Literacy",
    institution: user?.institution || "",
    location: user?.location || "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const initials = profile.fullName
    ? profile.fullName
        .split(" ")
        .filter(Boolean)
        .map((name) => name[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ST";

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Local demonstration only.
    // Backend profile update will be connected later.
    setEditing(false);
    setSuccess("Profile changes saved for this session.");

    setTimeout(() => setSuccess(""), 4000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (passwords.newPassword.length < 8) {
      setSuccess("New password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setSuccess("New passwords do not match.");
      return;
    }

    setSuccess(
      "Password form validated. Connect the backend to update your password."
    );

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-7 text-white sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-blue-400">
          Student Workspace / My Profile
        </p>

        <h1 className="text-2xl font-bold sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Success message */}
      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-300">
          <CheckCircle size={20} />
          {success}
        </div>
      )}

      {/* Profile overview */}
      <div className="mb-7 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        <div className="h-32 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900" />

        <div className="flex flex-col gap-5 px-6 pb-7 sm:flex-row sm:items-end">

          <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-slate-900 bg-blue-600 text-3xl font-bold text-white">
            {initials}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold">
              {profile.fullName || "Student"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {profile.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                Student Account
              </span>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                Active
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditing(!editing);
              setSuccess("");
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-700"
          >
            {editing ? <X size={17} /> : <Edit3 size={17} />}
            {editing ? "Cancel Editing" : "Edit Profile"}
          </button>

        </div>
      </div>

      {/* Profile information */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="space-y-6 xl:col-span-2">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                <User size={21} />
              </div>

              <div>
                <h3 className="font-bold">Personal Information</h3>
                <p className="text-xs text-slate-500">
                  Your personal account details
                </p>
              </div>
            </div>

            <form onSubmit={handleSave}>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Full Name
                  </label>

                  <input
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Email Address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Location
                  </label>

                  <input
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Enter your location"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:opacity-70"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm text-slate-400">
                    Institution / Training Centre
                  </label>

                  <input
                    name="institution"
                    value={profile.institution}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Enter institution name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:opacity-70"
                  />
                </div>

              </div>

              {editing && (
                <div className="mt-6 flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-700"
                  >
                    <Save size={17} />
                    Save Changes
                  </button>

                </div>
              )}

            </form>
          </div>

          {/* Account security */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h3 className="font-bold">Account Security</h3>
                <p className="text-xs text-slate-500">
                  Manage your account password
                </p>
              </div>
            </div>

            {!showPasswordForm ? (
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">Password</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Keep your account secure with a strong password.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(true);
                    setSuccess("");
                  }}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
                >
                  Change Password
                </button>
              </div>
            ) : (
              <form
                onSubmit={handlePasswordChange}
                className="space-y-4"
              >
                {[
                  {
                    name: "currentPassword",
                    label: "Current Password",
                  },
                  {
                    name: "newPassword",
                    label: "New Password",
                  },
                  {
                    name: "confirmPassword",
                    label: "Confirm New Password",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="mb-2 block text-sm text-slate-400">
                      {field.label}
                    </label>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={field.name === "currentPassword" ? undefined : 8}
                        value={passwords[field.name]}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            [field.name]: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-12 text-sm outline-none focus:border-blue-500"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-700"
                  >
                    Validate Password Change
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Student account information */}
        <div className="space-y-6">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="mb-5 font-bold">Student Information</h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">
                <GraduationCap className="text-blue-400" size={20} />

                <div>
                  <p className="text-xs text-slate-500">Student ID</p>
                  <p className="mt-1 text-sm font-semibold">
                    {profile.studentId}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="text-blue-400" size={20} />

                <div>
                  <p className="text-xs text-slate-500">Course</p>
                  <p className="mt-1 text-sm font-semibold">
                    {profile.course}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-blue-400" size={20} />

                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="mt-1 break-all text-sm font-semibold">
                    {profile.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-blue-400" size={20} />

                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="mt-1 text-sm font-semibold">
                    {profile.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-blue-400" size={20} />

                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="mt-1 text-sm font-semibold">
                    {profile.location || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="text-blue-400" size={20} />

                <div>
                  <p className="text-xs text-slate-500">Account Role</p>
                  <p className="mt-1 text-sm font-semibold">
                    Student
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Security information */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <ShieldCheck className="mb-3 text-emerald-400" size={25} />

            <h3 className="font-semibold text-emerald-400">
              Account Protection
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Never share your password with anyone. Always sign out when using a shared computer.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
