import { useState } from "react";
import Navbar from "../../design/molecule/Navbar";
import RegisterForm from "../../design/organism/RegisterForm";
import { registerRequest } from "../services/register.service";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    contacto_emergencia: "",
    nombre_contacto: "",
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
      alert("Error al registrar usuario. Revisá los datos e intentá de nuevo.");
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Navbar />
      <RegisterForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  );
}

export default Register;
