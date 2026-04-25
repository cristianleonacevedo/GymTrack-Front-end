import { Navbar } from "../../design/molecule";
import { Button, Input } from "../../design/atomic";
import Background1 from "../../design/images/Background1.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("User");

    if (!storedUser) {
      alert("Usuario no registrado");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === email && user.password === password) {
      localStorage.set("isAuth", "true");
      alert("Logueado exitosamente");
      console.log("bienvenido", user.name);
      navigate("/home");
    } else {
      alert("Credenciales incorrectas");
    }
  };
  return (
    <div
      className="min-h-screen items-center justify-center bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${Background1})` }}
    >
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-2 pt-0 border-2 w-80"
      >
        <h1 className="font-bold text-center mb-4 bg-blue-100 ">
          Inicia sesión
        </h1>

        <Input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => Setemail(e.target.value)}
          className="w-full mb-4 p-2 border-2 rounded"
        />

        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => Setpassword(e.target.value)}
          className="w-full mb-4 p-2 border-2 rounded"
        />

        <Button text="Entrar" />
      </form>
    </div>
  );
}

export default Login;
