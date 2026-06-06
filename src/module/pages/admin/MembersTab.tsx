import { useState } from "react";
import { SectionHeader } from "../../../design/molecule";
import { getMemberAssignments } from "../../services/assignments.service";
import type { User, MembershipAssignment } from "../../types/user.types";

type Props = { users: User[]; loading: boolean };

export default function MembersTab({ users, loading }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<MembershipAssignment[]>([]);

  const handleViewDetail = async (userId: number) => {
    if (selectedId === userId) { setSelectedId(null); setAssignments([]); return; }
    try { setAssignments(await getMemberAssignments(userId)); }
    catch { setAssignments([]); }
    setSelectedId(userId);
  };

  return (
    <div>
      <SectionHeader tittle="Lista de Miembros" />
      {loading ? (
        <p className="text-gray-500 text-center mt-4">Cargando miembros...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm mt-4">
            <thead>
              <tr className="bg-orange-100">
                <th className="border p-2 text-left">Nombre</th>
                <th className="border p-2 text-left">Documento</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Rol</th>
                <th className="border p-2 text-left">Membresía</th>
                <th className="border p-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => [
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="border p-2">{u.nombre} {u.apellido}</td>
                  <td className="border p-2">{u.documento}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{u.rol}</span>
                  </td>
                  <td className="border p-2">
                    <span className={`text-xs px-2 py-0.5 rounded text-white ${u.membresiaActiva ? "bg-green-500" : "bg-gray-400"}`}>
                      {u.estadoMembresia || "PENDIENTE"}
                    </span>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleViewDetail(u.id)}
                      className="text-xs px-2 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
                    >
                      {selectedId === u.id ? "Ocultar" : "Ver membresías"}
                    </button>
                  </td>
                </tr>,
                selectedId === u.id && (
                  <tr key={`detail-${u.id}`}>
                    <td colSpan={6} className="border p-3 bg-orange-50">
                      <p className="font-semibold text-sm mb-2">Historial de membresías:</p>
                      {assignments.length === 0 ? (
                        <p className="text-gray-400 text-sm">Sin membresías registradas.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {assignments.map((a) => (
                            <div key={a.id} className="bg-white border rounded p-2 text-xs">
                              <p className="font-medium">{a.planName}</p>
                              <p className="text-gray-500">{a.startDate} → {a.endDate}</p>
                              <span className={`px-1.5 py-0.5 rounded text-white ${a.status === "ACTIVA" ? "bg-green-500" : "bg-gray-400"}`}>
                                {a.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ),
              ])}
              {users.length === 0 && (
                <tr><td colSpan={6} className="text-center p-4 text-gray-400">No hay miembros registrados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
