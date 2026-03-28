import Dumbbel from "../images/Dumbbell.webp";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isAuth = true

  return (

    <nav className="w-full fixed top-0 flex items-center bg-gray-100">
      <Link to={isAuth? "/" : "/home"}>
        <img src={Dumbbel} alt="Logo" width={60} className="p-1.5 bg-blue-100" />
      </Link>

      {isAuth &&(      
        <div id="Options"className="absolute right-0">
          <a href="/login" className="p-1 mr-1.5 border-1 font-bold hover:bg-gray-200 rounded">Login</a>
          <a href="/Register" className="mr-1.5 ml-1.5 p-1 border-1 font-bold hover:bg-gray-200 rounded">Register</a>
          <a href="" className="mr-1.5 ml-1.5 p-1 border-1 font-bold hover:bg-gray-200 rounded">About us</a>
          <a href="" className="mr-1.5 ml-1.5 p-1 border-1 font-bold hover:bg-gray-200 rounded">Help</a>    
        </div>
      )}

      {!isAuth &&(      
        <div id="Options"className="absolute right-0">
          <a href="" className="mr-1.5 ml-1.5 p-1 border-1 font-bold hover:bg-gray-200 rounded">About us</a>
          <a href="" className="mr-1.5 ml-1.5 p-1 border-1 font-bold hover:bg-gray-200 rounded">Help</a>    
        </div>
      )}
    </nav>
  );
}

export default Navbar;