import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

function getDefaultRoute(rol: string): string {
  if (rol === "ADMIN") return "/admin";
  if (rol === "RECEPCION" || rol === "RECEPCIONISTA") return "/recepcion";
  if (rol === "INSTRUCTOR") return "/instructor";
  return "/home";
}

function ProtectedRoute({ children, allowedRoles }: Props) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol") ?? "";

  // Sin token → login
  if (!token) return <Navigate to="/login" replace />;

  // Si tiene token pero aún no tiene rol (ej: primera carga) → dejar pasar
  // El rol se setea después de que getMe() responda exitosamente
  if (!rol) return <>{children}</>;

  // Tiene rol pero no tiene permiso → redirigir a su ruta correcta
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(rol)) {
    return <Navigate to={getDefaultRoute(rol)} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
