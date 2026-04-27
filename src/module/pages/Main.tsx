import "tailwindcss";
import Navbar from "../../design/molecule/Navbar";
import Banner from "../../design/molecule/Banner";
import Button from "../../design/atomic/Button";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <Banner />

      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          GymTrack
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Controla tus entrenamientos, clases y progreso en un solo lugar.
          <br />
          El sistema de gestión fitness más eficiente para tu gimnasio.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button text="Iniciar sesión" onClick={() => navigate("/login")} />

          <Button text="Registrarse" onClick={() => navigate("/register")} />
        </div>
      </div>

      <div className="bg-orange-400/20 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-bold text-lg mb-2">Clases en vivo</h3>
            <p className="text-gray-600">
              Reserva y gestiona tus clases fácilmente.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-bold text-lg mb-2">Seguimiento</h3>
            <p className="text-gray-600">
              Controla tu actividad mensual en tiempo real.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-bold text-lg mb-2">Membresía</h3>
            <p className="text-gray-600">
              Gestiona tu plan y beneficios fácilmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
