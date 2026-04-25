import Dumbbel from "../images/Dumbbell.webp";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav className="flex w-full sticky top-0 items-center bg-gray-100 z-50 pr-3">
      <Link to={localStorage.isAuth ? "/" : "/home"}>
        <img
          src={Dumbbel}
          alt="Logo"
          width={60}
          className="p-1.5 bg-orange-700/50"
        />
      </Link>

      {localStorage.isAuth && (
        <div id="Options" className="absolute right-0">
          <a
            href="/login"
            className="p-1 mr-1.5 border font-bold hover:bg-gray-200 rounded"
          >
            Login
          </a>
          <a
            href="/Register"
            className="mr-1.5 ml-1.5 p-1 border font-bold hover:bg-gray-200 rounded"
          >
            Register
          </a>
          <a
            href=""
            className="mr-1.5 ml-1.5 p-1 border font-bold hover:bg-gray-200 rounded"
          >
            About us
          </a>
          <a
            href=""
            className="mr-1.5 ml-1.5 p-1 border font-bold hover:bg-gray-200 rounded"
          >
            Help
          </a>
        </div>
      )}

      {!localStorage.isAuth && (
        <div id="Options" className="absolute right-0">
          <a
            href=""
            className="mr-1.5 ml-1.5 p-1 border font-bold hover:bg-gray-200 rounded"
          >
            About us
          </a>
          <a
            href=""
            className="mr-1.5 ml-1.5 p-1 border font-bold hover:bg-gray-200 rounded"
          >
            Help
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;