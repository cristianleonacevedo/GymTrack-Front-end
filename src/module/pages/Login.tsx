import { Navbar } from "../../design/molecule";
import { Button, Input } from "../../design/atomic";
import Background1 from "../../design/images/Background1.jpg";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest, getMe } from "../services/Auth.service";

function Login() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginRequest({ email, password });

      localStorage.setItem("token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
      localStorage.setItem("isAuth", "true");

      try {
        const me = await getMe();
        localStorage.setItem("rol", me.rol);
        localStorage.setItem("userName", me.nombre);
        localStorage.setItem("userId", String(me.id));

        if (me.rol === "ADMIN") navigate("/admin");
        else if (me.rol === "RECEPCION" || me.rol === "RECEPCIONISTA") navigate("/recepcion");
        else if (me.rol === "INSTRUCTOR") navigate("/instructor");
        else navigate("/home");
      } catch {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${Background1})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-sm mx-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header strip */}
            <div className="bg-orange-500 px-6 py-5 text-white">
              <p className="text-orange-200 text-xs font-semibold tracking-widest uppercase mb-1">
                GymTrack
              </p>
              <h1 className="text-2xl font-bold">Bienvenido de vuelta</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <Input
                type="email"
                value={email}
                placeholder="tu@email.com"
                label="Correo electrónico"
                onChange={(e) => Setemail(e.target.value)}
                required
              />

              <Input
                type="password"
                value={password}
                placeholder="••••••••"
                label="Contraseña"
                onChange={(e) => Setpassword(e.target.value)}
                required
              />

              <div className="pt-2">
                <Button
                  text={loading ? "Entrando..." : "Iniciar sesión"}
                  type="submit"
                  disabled={loading}
                  className="w-full"
                />
              </div>

              <p className="text-center text-sm text-gray-500 pt-1">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-orange-500 font-semibold hover:text-orange-600">
                  Regístrate
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
