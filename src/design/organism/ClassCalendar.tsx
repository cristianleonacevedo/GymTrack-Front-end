import { useState } from "react";
import type { GymClass } from "../../module/types/class.types";
import SectionHeader from "../molecule/SectionHeader";
import CalendarGrid from "./calendar/CalendarGrid";
import ClassList from "./calendar/ClassList";

type Props = {
  classes: GymClass[]; reservedIds: number[];
  onReserve: (id: number) => void; onClose: () => void;
  mode: "available" | "reserved";
};

export default function ClassCalendar({ classes, reservedIds, onReserve, onClose, mode }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear((y) => y - 1); } else setMonth((m) => m - 1); setSelectedDay(null); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear((y) => y + 1); } else setMonth((m) => m + 1); setSelectedDay(null); };

  const classesByDay: Record<number, GymClass[]> = {};
  classes.forEach((c) => {
    const d = new Date(c.fecha + "T00:00:00");
    if (d.getFullYear() !== year || d.getMonth() !== month) return;
    const day = d.getDate();
    const isReserved = reservedIds.includes(c.id);
    if (mode === "reserved" && !isReserved) return;
    if (!classesByDay[day]) classesByDay[day] = [];
    classesByDay[day].push({ ...c, estado: isReserved ? "RESERVADA" : c.estado });
  });

  const selectedClasses = selectedDay ? (classesByDay[selectedDay] ?? []) : [];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <SectionHeader tittle={mode === "available" ? "Clases disponibles" : "Mis clases reservadas"} />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">X</button>
        </div>
        <CalendarGrid year={year} month={month} selectedDay={selectedDay} today={today}
          markedDays={new Set(Object.keys(classesByDay).map(Number))}
          onSelectDay={setSelectedDay} onPrev={prevMonth} onNext={nextMonth} />
        <div className="border-t pt-3 min-h-[100px]">
          <ClassList selectedDay={selectedDay} month={month} classes={selectedClasses} reservedIds={reservedIds} mode={mode} onReserve={onReserve} />
        </div>
      </div>
    </div>
  );
}
