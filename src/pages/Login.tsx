import Navbar from "../components/molecule/Navbar";
import { Link } from "react-router-dom"
import Button from "../components/atomic/Button";
import Background1 from "../components/images/Background1.jpg"

function Login() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-cover bg-center h-screen" style={{ backgroundImage:`url(${Background1})` }}>
      <Navbar />
      <form className="bg-white rounded p-2 pt-0 border-2 w-80">
        <h1 className="font-bold text-center mb-4 bg-blue-100 ">Inicia sesión</h1>

        <input
          type="email"
          placeholder="Correo"
          className="w-full mb-3 p-2 border-2 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border-2 rounded"
        />

        <Link to="/Home">  
          <Button text="Entrar"/>
        </Link>
      </form>
    </div>
  )
}

export default Login