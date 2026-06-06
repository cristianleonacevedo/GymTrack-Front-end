import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../../design/molecule";
import { Card } from "../../design/atomic";
import { SectionHeader } from "../../design/molecule";
import { apiClient } from "../../core/api/api-client";
import ClassRow from "./instructor/ClassRow";
import type { InstructorClass, Reserva, AttendanceStatus } from "./instructor/instructor.types";

function InstructorDashboard() {
  const [classes, setClasses] = useState<InstructorClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [attendanceMsg, setAttendanceMsg] = useState("");

  const loadMyClasses = useCallback(async () => {
    setLoading(true);
    try { setClasses((await apiClient.get("/api/instructor/classes/me")).data as InstructorClass[]); }
    catch { setClasses([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadMyClasses(); }, [loadMyClasses]);

  const handleViewReservas = async (classId: number) => {
    if (selectedClass === classId) { setSelectedClass(null); setReservas([]); return; }
    setSelectedClass(classId);
    setLoadingReservas(true);
    try { setReservas((await apiClient.get(`/api/instructor/classes/${classId}/reservas`)).data as Reserva[]); }
    catch { setReservas([]); }
    finally { setLoadingReservas(false); }
  };

  const handleMarkAttendance = async (reservaId: number, estado: AttendanceStatus) => {
    setAttendanceMsg("");
    try {
      await apiClient.patch(`/api/instructor/reservas/${reservaId}/attendance`, { estado });
      setReservas((prev) => prev.map((r) => (r.id === reservaId ? { ...r, estado } : r)));
      setAttendanceMsg("Asistencia registrada.");
    } catch { setAttendanceMsg("Error al registrar asistencia."); }
  };

  const today = new Date().toISOString().split("T")[0];
  const rowProps = { today, selectedClass, reservas, loadingReservas, attendanceMsg, onViewReservas: handleViewReservas, onMarkAttendance: handleMarkAttendance };

  const sections = [
    { title: "Clases de Hoy", items: classes.filter((c) => c.fecha === today), span: false },
    { title: "Próximas Clases", items: classes.filter((c) => c.fecha > today).slice(0, 5), span: false },
    { title: "Clases Recientes", items: classes.filter((c) => c.fecha < today).slice(0, 5), span: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-0.5">GymTrack</p>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Instructor</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 animate-fadeIn">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-32 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map(({ title, items, span }) => (
              <Card key={title} className={span ? "md:col-span-2" : ""}>
                <SectionHeader tittle={title} />
                {items.length === 0
                  ? <p className="text-gray-400 text-sm mt-2">Sin clases.</p>
                  : items.map((c) => <ClassRow key={c.id} c={c} {...rowProps} />)
                }
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard;
