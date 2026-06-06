import Dumbbel from "../images/Dumbbell.webp";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("isAuth");
  const rol = localStorage.getItem("rol") || "";
  const userName = localStorage.getItem("userName") || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("rol");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (rol === "ADMIN") return "/admin";
    if (rol === "RECEPCION" || rol === "RECEPCIONISTA") return "/recepcion";
    if (rol === "INSTRUCTOR") return "/instructor";
    return "/home";
  };

  const navLinkClass =
    "px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-150";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link to={isAuth ? getDashboardLink() : "/"} className="flex items-center gap-2.5 group">
          <div className="bg-orange-500 rounded-lg p-1.5 group-hover:bg-orange-600 transition-colors">
            <img src={Dumbbel} alt="Logo" width={28} className="brightness-0 invert" />
          </div>
          <span className="font-bold text-gray-800 text-base tracking-tight hidden sm:block">
            Gym<span className="text-orange-500">Track</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {isAuth ? (
            <>
              {rol === "ADMIN" && (
                <Link to="/admin" className={navLinkClass}>Admin</Link>
              )}
              {(rol === "RECEPCION" || rol === "RECEPCIONISTA") && (
                <Link to="/recepcion" className={navLinkClass}>Recepción</Link>
              )}
              {rol === "INSTRUCTOR" && (
                <Link to="/instructor" className={navLinkClass}>Mis Clases</Link>
              )}
              {rol === "MIEMBRO" && (
                <Link to="/home" className={navLinkClass}>Mi Panel</Link>
              )}

              {/* User pill */}
              {userName && (
                <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 text-sm font-medium rounded-full ml-1">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  {userName}
                </span>
              )}

              <button
                onClick={handleLogout}
                className="ml-1 px-3 py-1.5 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClass}>Iniciar sesión</Link>
              <Link
                to="/register"
                className="ml-1 px-4 py-1.5 text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-all duration-150 shadow-sm"
              >
                Registrarse
              </Link>
            </>
          )}

          <a href="#about" className={`${navLinkClass} ml-1`}>Nosotros</a>
          <a href="#help" className={navLinkClass}>Ayuda</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
