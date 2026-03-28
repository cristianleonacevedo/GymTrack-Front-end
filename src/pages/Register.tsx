import "tailwindcss";
import { useState } from "react";
import Button from "../components/atomic/Button";
import Navbar from "../components/molecule/Navbar";
import Background1 from "../components/images/Background1.jpg"
import { Link } from "react-router-dom"

function Register() {

  const [name, Setname] = useState ("");
  const [email,Setemail] = useState ("");
  const [password,Setpassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log({
      name,
      email,
      password
    })
  }
  return (

    <div id="BackgroundR" style={{ backgroundImage:`url(${Background1})` }} className="min-h-screen pt-16 flex items-center justify-center bg-cover bg-center h-screen">
      <Navbar />
      <form id="RegisterForm" className="bg-white rounded p-2 pt-0 border-2 w-80">
        <h1 className="font-bold text-center mb-4 bg-blue-100 ">Registro</h1>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e)=> Setname(e.target.value)}
          className="w-full mb-3 p-2 border-2 rounded"
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e)=> Setemail(e.target.value)}
          className="w-full mb-3 p-2 border-2 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e)=> Setpassword(e.target.value)}
          className="w-full mb-4 p-2 border-2 rounded"
        />

        <Link id="RegisterBotton" to="/login">  
          <Button text="Register"/>
        </Link>
      </form>
    </div>
  );
}

export default Register;