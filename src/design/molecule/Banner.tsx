import "tailwindcss";
import Button from "../atomic/Button";
import { Link } from "react-router-dom";
import AgnesTachyon from "../images/AgnesTachyon1.jpg";

function Banner() {
  return (
    <section
      id="Banner"
      style={{ backgroundImage: `url(${AgnesTachyon})` }}
      className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 px-6 animate-fadeIn">
        <p className="text-orange-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
          Bienvenido a GymTrack
        </p>
        <h1
          className="text-white font-bold mb-4 leading-tight"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            letterSpacing: "0.02em",
            textShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          Donde el flow
          <br />
          <span className="text-orange-400">se entrena</span>
        </h1>

        <p className="text-gray-300 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Sin excusas, solo progreso, esfuerzo y dedicación.
        </p>

        <Link to="/register">
          <Button text="Empieza hoy" size="lg" />
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/40"></div>
      </div>
    </section>
  );
}

export default Banner;
