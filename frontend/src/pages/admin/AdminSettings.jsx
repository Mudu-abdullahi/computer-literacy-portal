
import { useState } from "react";
import {
  Settings,
  Building2,
  User,
  Bell,
  ShieldCheck,
  Save,
  Mail,
  Globe,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    portalName: "Computer Literacy Learning Portal",
    portalEmail: "admin@example.com",
    description: "A learning platform for computer literacy students.",
    website: "https://example.com",
    adminName: "Administrator",
    adminEmail: "admin@example.com",
    emailNotifications: true,
    studentNotifications: true,
    assignmentNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
    requireApproval: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateSetting = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (
      settings.newPassword &&
      settings.newPassword !== settings.confirmPassword
    ) {
      alert("New password and confirmation do not match.");
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "account", label: "Admin Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "system", label: "System Preferences", icon: Settings },
  ];

  const Toggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-5 last:border-0">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  const InputField = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    icon: Icon,
  }) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 ${
            Icon ? "pl-10" : "pl-4"
          }`}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-7 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your portal configuration and administrator preferences.
        </p>
      </div>

      {/* Settings layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar tabs */}
        <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-3">
          <div className="mb-3 px-3 pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Settings Menu
            </p>
          </div>

          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main settings form */}
        <form
          onSubmit={handleSave}
          className="space-y-6 lg:col-span-3"
        >
          {/* General settings */}
          {activeTab === "general" && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <Building2 size={21} />
                </div>
                <div>
                  <h2 className="font-semibold text-white">
                    General Information
                  </h2>
                  <p className="text-xs text-slate-400">
                    Update your learning portal details.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <InputField
                  label="Portal Name"
                  value={settings.portalName}
                  onChange={(e) =>
                    updateSetting("portalName", e.target.value)
                  }
                  icon={Building2}
                />

                <InputField
                  label="Portal Email"
                  value={settings.portalEmail}
                  onChange={(e) =>
                    updateSetting("portalEmail", e.target.value)
                  }
                  type="email"
                  icon={Mail}
                />

                <InputField
                  label="Website URL"
                  value={settings.website}
                  onChange={(e) =>
                    updateSetting("website", e.target.value)
                  }
                  icon={Globe}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Portal Description
                  </label>
                  <textarea
                    rows="4"
                    value={settings.description}
                    onChange={(e) =>
                      updateSetting("description", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Admin account */}
          {activeTab === "account" && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <User size={21} />
                </div>
                <div>
                  <h2 className="font-semibold text-white">
                    Administrator Account
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage your administrator profile.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <InputField
                  label="Full Name"
                  value={settings.adminName}
                  onChange={(e) =>
                    updateSetting("adminName", e.target.value)
                  }
                />

                <InputField
                  label="Email Address"
                  value={settings.adminEmail}
                  onChange={(e) =>
                    updateSetting("adminEmail", e.target.value)
                  }
                  type="email"
                  icon={Mail}
                />

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">Account Role</p>
                  <p className="mt-1 font-medium text-blue-400">
                    Administrator
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Administrator permissions are managed by the system.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <Bell size={21} />
                </div>
                <div>
                  <h2 className="font-semibold text-white">
                    Notification Preferences
                  </h2>
                  <p className="text-xs text-slate-400">
                    Choose which notifications you want to receive.
                  </p>
                </div>
              </div>

              <Toggle
                label="Email Notifications"
                description="Receive important portal updates through email."
                checked={settings.emailNotifications}
                onChange={(value) =>
                  updateSetting("emailNotifications", value)
                }
              />

              <Toggle
                label="Student Registration Alerts"
                description="Get notified when new students register."
                checked={settings.studentNotifications}
                onChange={(value) =>
                  updateSetting("studentNotifications", value)
                }
              />

              <Toggle
                label="Assignment Notifications"
                description="Receive updates when students submit assignments."
                checked={settings.assignmentNotifications}
                onChange={(value) =>
                  updateSetting("assignmentNotifications", value)
                }
              />
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <ShieldCheck size={21} />
                </div>
                <div>
                  <h2 className="font-semibold text-white">
                    Security Settings
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage your account password.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <InputField
                  label="Current Password"
                  value={settings.currentPassword}
                  onChange={(e) =>
                    updateSetting("currentPassword", e.target.value)
                  }
                  type={showPassword ? "text" : "password"}
                  icon={Lock}
                />

                <InputField
                  label="New Password"
                  value={settings.newPassword}
                  onChange={(e) =>
                    updateSetting("newPassword", e.target.value)
                  }
                  type={showPassword ? "text" : "password"}
                  icon={Lock}
                />

                <InputField
                  label="Confirm New Password"
                  value={settings.confirmPassword}
                  onChange={(e) =>
                    updateSetting("confirmPassword", e.target.value)
                  }
                  type={showPassword ? "text" : "password"}
                  icon={Lock}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showPassword ? "Hide passwords" : "Show passwords"}
                </button>
              </div>
            </div>
          )}

          {/* System preferences */}
          {activeTab === "system" && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <Settings size={21} />
                </div>
                <div>
                  <h2 className="font-semibold text-white">
                    System Preferences
                  </h2>
                  <p className="text-xs text-slate-400">
                    Configure basic portal behaviour.
                  </p>
                </div>
              </div>

              <Toggle
                label="Allow Student Registration"
                description="Allow new students to create accounts."
                checked={settings.allowRegistration}
                onChange={(value) =>
                  updateSetting("allowRegistration", value)
                }
              />

              <Toggle
                label="Require Administrator Approval"
                description="New student accounts must be approved before access."
                checked={settings.requireApproval}
                onChange={(value) =>
                  updateSetting("requireApproval", value)
                }
              />

              <Toggle
                label="Maintenance Mode"
                description="Indicate that the portal is under maintenance."
                checked={settings.maintenanceMode}
                onChange={(value) =>
                  updateSetting("maintenanceMode", value)
                }
              />
            </div>
          )}

          {/* Save button */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div>
              {saved && (
                <p className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle size={17} />
                  Settings saved in this session.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <p className="text-xs text-slate-500">
        Settings currently remain in frontend state only. Persistent saving
        and password changes will be implemented during backend integration.
      </p>
    </div>
  );
}
