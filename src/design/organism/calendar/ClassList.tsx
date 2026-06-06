import { MONTHS, STATUS_COLORS } from "./calendar.constants";
import type { GymClass } from "../../../module/types/class.types";

type Props = {
  selectedDay: number | null; month: number;
  classes: GymClass[]; reservedIds: number[];
  mode: "available" | "reserved";
  onReserve: (id: number) => void;
};

export default function ClassList({ selectedDay, month, classes, reservedIds, mode, onReserve }: Props) {
  if (!selectedDay) return <p className="text-gray-400 text-sm text-center mt-4">Selecciona un dia para ver las clases.</p>;
  if (classes.length === 0) return <p className="text-gray-400 text-sm text-center mt-4">{mode === "reserved" ? "No tienes clases reservadas este dia." : "No hay clases este dia."}</p>;

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-400 mb-2">{selectedDay} de {MONTHS[month]}</p>
      {classes.map((c) => {
        const isReserved = reservedIds.includes(c.id) || c.estado === "RESERVADA";
        return (
          <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
            <div>
              <p className="font-semibold text-sm text-gray-800">{c.nombre}</p>
              <p className="text-xs text-gray-500">{c.hora_inicio} · {c.instructor}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs text-white px-2 py-0.5 rounded-full ${STATUS_COLORS[isReserved ? "RESERVADA" : (c.estado ?? "DISPONIBLE")]}`}>
                {isReserved ? "Reservada" : "Disponible"}
              </span>
              {!isReserved && mode === "available" && (
                <button onClick={() => onReserve(c.id)} className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg font-semibold transition">
                  Reservar
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
