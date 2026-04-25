import "tailwindcss";
import { useState } from "react";
import { loginRequest } from "../services/Auth.service";
import Navbar from "../../design/molecule/Navbar";
import Background1 from "../../design/images/Background1.jpg";
import RegisterForm from "../../design/organism/RegisterForm";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(form);
    } catch (error) {
      console.error(error);
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