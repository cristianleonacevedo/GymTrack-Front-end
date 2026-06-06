import { useState } from "react";
import { Navbar } from "../../design/molecule";
import { Card } from "../../design/atomic";
import { ClassItem, InfoItem, SectionHeader } from "../../design/molecule";
import ClassCalendar from "../../design/organism/ClassCalendar";
import { useHomeData } from "../hooks/useHomeData";
import { apiClient } from "../../core/api/api-client";

type CheckinRecord = {
  id: number;
  fecha: string;
  hora_entrada: string;
  hora_salida: string | null;
  duracion: number | null;
};

function StatBadge({ label, value, color = "orange" }: { label: string; value: string | number; color?: string }) {
  const colors: Record<string, string> = {
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    green: "bg-green-100 text-green-700 border-green-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${colors[color] || colors.orange}`}>
      <span className="text-xs font-normal opacity-70">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Home() {
  const { classes, membership, activity, loading, error } = useHomeData();
  const [calendar, setCalendar] = useState<"available" | "reserved" | null>(null);
  const [reservedIds, setReservedIds] = useState<number[]>([]);
  const [showCheckins, setShowCheckins] = useState(false);
  const [checkins, setCheckins] = useState<CheckinRecord[]>([]);
  const [loadingCheckins, setLoadingCheckins] = useState(false);

  const handleReserve = (classId: number) => {
    setReservedIds((prev) =>
      prev.includes(classId) ? prev : [...prev, classId],
    );
  };

  const loadCheckins = async () => {
    if (showCheckins) {
      setShowCheckins(false);
      return;
    }
    setLoadingCheckins(true);
    try {
      const res = await apiClient.get("/api/checkin/me");
      setCheckins(res.data);
    } catch {
      setCheckins([]);
    } finally {
      setLoadingCheckins(false);
      setShowCheckins(true);
    }
  };

  const userName = localStorage.getItem("userName") || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-0.5">Mi Panel</p>
            <h1 className="text-2xl font-bold text-gray-900">
              {userName ? `Hola, ${userName} 👋` : "Bienvenido"}
            </h1>
          </div>
          {membership && (
            <StatBadge label="Plan" value={membership.plan} color="orange" />
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 animate-fadeIn">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Membership card - takes 2 cols */}
          <Card className="lg:col-span-2">
            <SectionHeader tittle="Mi Membresía" />
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-5 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : membership ? (
              <div className="space-y-1.5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <StatBadge label="Estado" value={membership.estado} color={membership.estado === "ACTIVO" ? "green" : "gray"} />
                  <StatBadge label="Días restantes" value={membership.dias_restantes} color="blue" />
                </div>
                <InfoItem label="Plan" value={membership.plan} />
                <InfoItem label="Válida hasta" value={membership.fecha_fin} />
                {membership.clases_disponibles !== null && (
                  <InfoItem
                    label="Clases grupales"
                    value={`${membership.clases_usadas} usadas / ${membership.clases_disponibles ?? "Ilimitadas"}`}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="text-3xl mb-2">💳</div>
                <p className="text-gray-500 text-sm">No tienes una membresía activa.</p>
              </div>
            )}
          </Card>

          {/* Activity */}
          <Card>
            <SectionHeader tittle="Mi Actividad" />
            {loading ? (
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
            ) : (
              <>
                <div className="text-center py-3">
                  <p className="text-4xl font-bold text-orange-500">{activity?.total_visitas ?? 0}</p>
                  <p className="text-xs text-gray-400 mt-1">visitas este mes</p>
                </div>
                <button
                  onClick={loadCheckins}
                  className="w-full mt-2 text-xs text-orange-500 font-medium hover:text-orange-700 hover:bg-orange-50 py-2 rounded-lg transition-colors"
                >
                  {showCheckins ? "Ocultar historial" : "Ver historial →"}
                </button>

                {showCheckins && (
                  <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto">
                    {loadingCheckins ? (
                      <p className="text-gray-400 text-xs text-center py-2">Cargando...</p>
                    ) : checkins.length === 0 ? (
                      <p className="text-gray-400 text-xs text-center py-2">Sin visitas registradas.</p>
                    ) : (
                      checkins.map((c) => (
                        <div key={c.id} className="text-xs bg-gray-50 border border-gray-100 rounded-xl p-2.5">
                          <p className="font-semibold text-gray-700">{c.fecha}</p>
                          <p className="text-gray-400 mt-0.5">
                            Entrada: {c.hora_entrada}
                            {c.hora_salida ? ` · Salida: ${c.hora_salida}` : ""}
                            {c.duracion !== null ? ` · ${c.duracion} min` : ""}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </Card>

          {/* Available classes */}
          <Card className="cursor-pointer" hover onClick={() => setCalendar("available")}>
            <SectionHeader tittle="Clases Disponibles" />
            {loading ? (
              <div className="space-y-2">
                {[1, 2].map(i => <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />)}
              </div>
            ) : classes.length === 0 ? (
              <p className="text-gray-400 text-sm">No hay clases disponibles.</p>
            ) : (
              <>
                {classes.slice(0, 3).map((c) => (
                  <ClassItem
                    key={c.id}
                    name={c.nombre}
                    time={c.hora_inicio}
                    status={reservedIds.includes(c.id) ? "RESERVADA" : c.estado}
                  />
                ))}
                <p className="text-xs text-orange-500 mt-3 font-medium">Ver calendario completo →</p>
              </>
            )}
          </Card>

          {/* Reserved classes */}
          <Card className="cursor-pointer" hover onClick={() => setCalendar("reserved")}>
            <SectionHeader tittle="Mis Clases" />
            {loading ? (
              <div className="h-8 bg-gray-100 rounded-lg animate-pulse" />
            ) : reservedIds.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <div className="text-2xl mb-2">📅</div>
                <p className="text-gray-400 text-sm">No tienes clases reservadas.</p>
              </div>
            ) : (
              <>
                {classes
                  .filter((c) => reservedIds.includes(c.id))
                  .slice(0, 3)
                  .map((c) => (
                    <ClassItem key={c.id} name={c.nombre} time={c.hora_inicio} status="RESERVADA" />
                  ))}
                <p className="text-xs text-green-500 mt-3 font-medium">Ver mi calendario →</p>
              </>
            )}
          </Card>
        </div>
      </div>

      {calendar && (
        <ClassCalendar
          classes={classes}
          reservedIds={reservedIds}
          onReserve={handleReserve}
          onClose={() => setCalendar(null)}
          mode={calendar}
        />
      )}
    </div>
  );
}

export default Home;
