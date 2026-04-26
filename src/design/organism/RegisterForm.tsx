import { Button } from "../atomic";
import { Input } from "../atomic";
import type { RegisterFormData } from "../../module/types/auth.types";
import Background1 from "../images/Background1.jpg";

type Props = {
  form: RegisterFormData;
  onChange: (field: keyof RegisterFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function RegisterForm({ form, onChange, onSubmit }: Props) {
  return (
    <div
      id="BackgroundR"
      style={{ backgroundImage: `url(${Background1})` }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center h-screen"
    >
      <form
        id="RegisterForm"
        onSubmit={onSubmit}
        className="bg-white rounded p-2 pt-0 border-2 w-80"
      >
        <h1 className="font-bold text-center mb-4 bg-blue-100 ">Registro</h1>

        <Input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => onChange("nombre", e.target.value)}
          className="w-full mb-3 p-2"
        />

        <Input
          type="text"
          placeholder="Apellido"
          value={form.apellido}
          onChange={(e) => onChange("apellido", e.target.value)}
          className="w-full mb-3 p-2"
        />

        <Input
          type="text"
          placeholder="Documento"
          value={form.documento}
          onChange={(e) => onChange("documento", e.target.value)}
          className="w-full mb-3 p-2"
        />

        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="w-full mb-3 p-2"
        />

        <Input
          type="text"
          placeholder="Telefono"
          value={form.telefono}
          onChange={(e) => onChange("telefono", e.target.value)}
          className="w-full mb-3 p-2"
        />

        <Input
          type="text"
          placeholder="Contacto De Emergencia"
          value={form.contacto_emergencia}
          onChange={(e) => onChange("contacto_emergencia", e.target.value)}
          className="w-full mb-3 p-2"
        />

        <Input
          type="date"
          placeholder="Fecha De Nacimiento"
          value={form.fecha_nacimiento}
          onChange={(e) => onChange("fecha_nacimiento", e.target.value)}
          className="w-full mb-3 p-2"
        />

        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
          className="w-full mb-4 p-2"
        />

        <Button text="Register" type="submit"/>
      </form>
    </div>
  );
}
