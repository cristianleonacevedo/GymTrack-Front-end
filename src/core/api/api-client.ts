import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    // Solo redirigir a login si el token expiró (401)
    // 403 = sin permisos, no cerrar sesión
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("rol");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
