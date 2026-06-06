import type { InstructorClass, Reserva, AttendanceStatus } from "./instructor.types";

const STATUS_COLORS: Record<string, string> = {
  PROGRAMADA: "bg-blue-400",
  EN_CURSO: "bg-orange-500",
  COMPLETADA: "bg-green-500",
  CANCELADA: "bg-red-400",
};

type Props = {
  c: InstructorClass;
  today: string;
  selectedClass: number | null;
  reservas: Reserva[];
  loadingReservas: boolean;
  attendanceMsg: string;
  onViewReservas: (id: number) => void;
  onMarkAttendance: (reservaId: number, estado: AttendanceStatus) => void;
};

export default function ClassRow({ c, today, selectedClass, reservas, loadingReservas, attendanceMsg, onViewReservas, onMarkAttendance }: Props) {
  const isSelected = selectedClass === c.id;
  return (
    <div className="bg-gray-50 rounded p-3 mb-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-sm">{c.tipo}</p>
          <p className="text-xs text-gray-500">{c.fecha} · {c.hora_inicio} · Sala: {c.sala}</p>
          <p className="text-xs text-gray-500 mt-0.5">Reservas: {c.total_reservas} / {c.capacidad_maxima}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-xs text-white px-2 py-0.5 rounded-full ${STATUS_COLORS[c.estado] ?? "bg-gray-400"}`}>{c.estado}</span>
          <button onClick={() => onViewReservas(c.id)} className="text-xs text-orange-600 underline hover:text-orange-800 mt-1">
            {isSelected ? "Ocultar inscritos" : "Ver inscritos"}
          </button>
        </div>
      </div>
      {isSelected && (
        <div className="mt-3 border-t pt-2">
          {attendanceMsg && <p className={`text-xs mb-2 ${attendanceMsg.includes("✅") ? "text-green-600" : "text-red-600"}`}>{attendanceMsg}</p>}
          {loadingReservas ? <p className="text-xs text-gray-400">Cargando...</p>
            : reservas.length === 0 ? <p className="text-xs text-gray-400">Sin inscritos.</p>
            : (
              <div className="space-y-1">
                {reservas.map((r) => (
                  <div key={r.id} className="flex items-center justify-between text-xs bg-white border rounded px-2 py-1">
                    <span>{r.miembroNombre}</span>
                    <div className="flex items-center gap-1">
                      <span className={`px-1.5 py-0.5 rounded text-white text-xs ${r.estado === "ASISTIO" ? "bg-green-500" : r.estado === "NO_ASISTIO" ? "bg-red-400" : "bg-gray-400"}`}>
                        {r.estado}
                      </span>
                      {c.fecha === today && r.estado === "RESERVADA" && (
                        <>
                          <button onClick={() => onMarkAttendance(r.id, "ASISTIO")} className="px-1.5 py-0.5 bg-green-500 text-white rounded hover:bg-green-600">✓</button>
                          <button onClick={() => onMarkAttendance(r.id, "NO_ASISTIO")} className="px-1.5 py-0.5 bg-red-400 text-white rounded hover:bg-red-500">✗</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      )}
    </div>
  );
}
