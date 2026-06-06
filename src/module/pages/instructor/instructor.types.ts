export type InstructorClass = {
  id: number;
  tipo: string;
  fecha: string;
  hora_inicio: string;
  sala: string;
  estado: string;
  total_reservas: number;
  capacidad_maxima: number;
};

export type Reserva = {
  id: number;
  miembroNombre: string;
  estado: string;
};

export type AttendanceStatus = "ASISTIO" | "NO_ASISTIO";
