import Main from "../module/pages/Main";
import Register from "../module/pages/Register";
import Login from "../module/pages/Login";
import Home from "../module/pages/Home";
import AdminDashboard from "../module/pages/AdminDashboard";
import RecepcionDashboard from "../module/pages/RecepcionDashboard";
import InstructorDashboard from "../module/pages/InstructorDashboard";
import ProtectedRoute from "../components/protectedtRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["MIEMBRO"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recepcion"
          element={
            <ProtectedRoute allowedRoles={["RECEPCION", "RECEPCIONISTA", "ADMIN"]}>
              <RecepcionDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR", "ADMIN"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
