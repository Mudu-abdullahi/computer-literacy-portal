
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin layout
import AdminLayout from "./components/admin/AdminLayout";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminSubjects from "./pages/admin/AdminSubjects";
import AdminMaterials from "./pages/admin/AdminMaterials";
import AdminAssignments from "./pages/admin/AdminAssignments";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

// Student layout
import StudentLayout from "./components/student/StudentLayout";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import MySubjects from "./pages/student/MySubjects";
import LearningMaterials from "./pages/student/LearningMaterials";
import Assignments from "./pages/student/Assignments";
import MyDownloads from "./pages/student/MyDownloads";
import MyProfile from "./pages/student/MyProfile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* ADMIN ROUTES */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]} />
            }
          >
            <Route path="/admin" element={<AdminLayout />}>

              <Route
                index
                element={<Navigate to="dashboard" replace />}
              />

              <Route
                path="dashboard"
                element={<AdminDashboard />}
              />

              <Route
                path="students"
                element={<AdminStudents />}
              />

              <Route
                path="subjects"
                element={<AdminSubjects />}
              />

              <Route
                path="materials"
                element={<AdminMaterials />}
              />

              <Route
                path="assignments"
                element={<AdminAssignments />}
              />

              <Route
                path="reports"
                element={<AdminReports />}
              />

              <Route
                path="settings"
                element={<AdminSettings />}
              />

            </Route>
          </Route>

          {/* STUDENT ROUTES */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["student"]} />
            }
          >
            <Route path="/student" element={<StudentLayout />}>

              <Route
                index
                element={<Navigate to="dashboard" replace />}
              />

              <Route
                path="dashboard"
                element={<StudentDashboard />}
              />

              <Route
                path="subjects"
                element={<MySubjects />}
              />

              <Route
                path="materials"
                element={<LearningMaterials />}
              />

              <Route
                path="assignments"
                element={<Assignments />}
              />

              <Route
                path="downloads"
                element={<MyDownloads />}
              />

              <Route
                path="profile"
                element={<MyProfile />}
              />

            </Route>
          </Route>

          {/* FALLBACK */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
