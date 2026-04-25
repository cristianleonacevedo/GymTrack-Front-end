import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
