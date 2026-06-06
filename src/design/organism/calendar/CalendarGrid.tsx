import { DAYS, MONTHS } from "./calendar.constants";

type Props = {
  year: number; month: number; selectedDay: number | null;
  today: Date; markedDays: Set<number>;
  onSelectDay: (day: number) => void;
  onPrev: () => void; onNext: () => void;
};

export default function CalendarGrid({ year, month, selectedDay, today, markedDays, onSelectDay, onPrev, onNext }: Props) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <button onClick={onPrev} className="px-3 py-1 rounded-lg hover:bg-orange-100 font-bold text-orange-500">‹</button>
        <span className="font-semibold text-gray-700">{MONTHS[month]} {year}</span>
        <button onClick={onNext} className="px-3 py-1 rounded-lg hover:bg-orange-100 font-bold text-orange-500">›</button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isSelected = day === selectedDay;
          return (
            <button key={day} onClick={() => onSelectDay(day)}
              className={`relative flex flex-col items-center justify-center rounded-xl py-1 text-sm font-medium transition-all
                ${isSelected ? "bg-orange-500 text-white shadow-md" : "hover:bg-orange-50 text-gray-700"}
                ${isToday && !isSelected ? "border border-orange-400" : ""}`}>
              {day}
              {markedDays.has(day) && <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? "bg-white" : "bg-orange-400"}`} />}
            </button>
          );
        })}
      </div>
    </>
  );
}
