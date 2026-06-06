export type ClassStatus = "RESERVADA" | "ASISTIO" | "CANCELADA" | "DISPONIBLE";

export type GymClass = {
  id: number;
  nombre: string;
  fecha: string;
  hora_inicio: string;
  instructor: string;
  estado?: ClassStatus;
};
