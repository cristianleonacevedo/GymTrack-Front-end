import "tailwindcss";
import Navbar from "../../design/molecule/Navbar";
import Banner from "../../design/molecule/Banner";
import Button from "../../design/atomic/Button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "🏋️",
    title: "Clases en vivo",
    desc: "Reserva y gestiona tus clases grupales fácilmente desde tu panel.",
    color: "bg-orange-50 border-orange-200",
    accent: "text-orange-500",
  },
  {
    icon: "📊",
    title: "Seguimiento",
    desc: "Controla tu actividad mensual, asistencia y progreso en tiempo real.",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-500",
  },
  {
    icon: "💳",
    title: "Membresía",
    desc: "Gestiona tu plan, fechas de vencimiento y beneficios fácilmente.",
    color: "bg-green-50 border-green-200",
    accent: "text-green-500",
  },
];

function Main() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Banner />

      {/* Features section */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-2">
              ¿Por qué GymTrack?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Todo lo que necesitas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`${f.color} border rounded-2xl p-6 hover:shadow-md transition-shadow duration-300`}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className={`font-bold text-lg mb-2 ${f.accent}`}>{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Únete a la comunidad GymTrack y toma control de tu entrenamiento hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button text="Crear cuenta" onClick={() => navigate("/register")} size="lg" />
            <Button
              text="Ya tengo cuenta"
              onClick={() => navigate("/login")}
              variant="secondary"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="bg-gray-900 py-6 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 GymTrack · Hecho con 💪
        </p>
      </div>
    </div>
  );
}

export default Main;
