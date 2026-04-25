import { useState } from "react";

export type RegisterFormData = {
  nombre: string;
  apellido: string;
  documento: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  contacto_emergencia: string;
  password: string;
};

const [form, Setform] = useState<RegisterFormData>({
  nombre: "",
  apellido: "",
  documento: "",
  email: "",
  telefono: "",
  fecha_nacimiento: "",
  contacto_emergencia: "",
  password: "",
});

const handleChange = (field: keyof RegisterFormData, value: string) => {
  Setform((prev) => ({
    ...prev,
    [field]: value,
  }));
};
