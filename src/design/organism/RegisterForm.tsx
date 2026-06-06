import { Button } from "../atomic";
import { Input } from "../atomic";
import type { RegisterFormData } from "../../module/types/auth.types";
import Background1 from "../images/Background1.jpg";
import { Link } from "react-router-dom";

type Props = {
  form: RegisterFormData;
  onChange: (field: keyof RegisterFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function RegisterForm({ form, onChange, onSubmit }: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${Background1})` }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-8"
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-md mx-4 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-orange-500 px-6 py-5 text-white">
            <p className="text-orange-200 text-xs font-semibold tracking-widest uppercase mb-1">GymTrack</p>
            <h1 className="text-2xl font-bold">Crear cuenta</h1>
            <p className="text-orange-200 text-sm mt-1">Únete a la comunidad</p>
          </div>

          <form onSubmit={onSubmit} className="p-6">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input
                type="text"
                placeholder="Juan"
                label="Nombre *"
                value={form.nombre}
                onChange={(e) => onChange("nombre", e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Pérez"
                label="Apellido"
                value={form.apellido}
                onChange={(e) => onChange("apellido", e.target.value)}
              />
            </div>

            <div className="space-y-3 mb-3">
              <Input
                type="text"
                placeholder="12345678"
                label="Documento"
                value={form.documento}
                onChange={(e) => onChange("documento", e.target.value)}
              />
              <Input
                type="email"
                placeholder="tu@email.com"
                label="Email"
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
              <Input
                type="text"
                placeholder="+57 300 000 0000"
                label="Teléfono"
                value={form.telefono}
                onChange={(e) => onChange("telefono", e.target.value)}
              />
            </div>

            <div className="border-t border-gray-100 pt-3 mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Contacto de emergencia</p>
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Nombre del contacto"
                  label="Nombre"
                  value={form.nombre_contacto}
                  onChange={(e) => onChange("nombre_contacto", e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="+57 300 000 0000"
                  label="Teléfono"
                  value={form.contacto_emergencia}
                  onChange={(e) => onChange("contacto_emergencia", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <Input
                type="date"
                label="Fecha de nacimiento"
                value={form.fecha_nacimiento}
                onChange={(e) => onChange("fecha_nacimiento", e.target.value)}
              />
              <Input
                type="password"
                placeholder="Mínimo 8 caracteres"
                label="Contraseña *"
                value={form.password}
                onChange={(e) => onChange("password", e.target.value)}
                required
              />
            </div>

            <Button text="Crear cuenta" type="submit" className="w-full" />

            <p className="text-center text-sm text-gray-500 mt-4">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-600">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
