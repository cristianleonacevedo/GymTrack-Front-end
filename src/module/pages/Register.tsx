import "tailwindcss";
import { useState } from "react";
import Navbar from "../../design/molecule/Navbar";
import Background1 from "../../design/images/Background1.jpg";
import RegisterForm from "../../design/organism/RegisterForm";
import { registerRequest } from "../services/register.service";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, Setform] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    contacto_emergencia: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerRequest(form);

      alert("Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario");
    }
  };

  const handleChange = (field: string, value: string) => {
    Setform((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      id="BackgroundR"
      style={{ backgroundImage: `url(${Background1})` }}
      className="min-h-screen items-center justify-center bg-cover bg-center h-screen"
    >
      <Navbar />
      <RegisterForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Register;
