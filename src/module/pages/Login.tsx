import { Navbar } from "../../design/molecule";
import { Button, Input } from "../../design/atomic";
import Background1 from "../../design/images/Background1.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/Auth.service";

function Login() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginRequest({ email, password });

      localStorage.setItem("token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
      localStorage.setItem("isAuth", "true");

      navigate("/home");
    } catch (error) {
      console.error(error);
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
