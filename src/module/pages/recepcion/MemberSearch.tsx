import { Card, Input } from "../../../design/atomic";
import { SectionHeader } from "../../../design/molecule";
import type { User, MembershipAssignment } from "../../types/user.types";

type Props = {
  assignDoc: string;
  onDocChange: (v: string) => void;
  onSearch: () => void;
  assignUser: User | null;
  userAssignments: MembershipAssignment[];
};

export default function MemberSearch({
  assignDoc, onDocChange, onSearch,
  assignUser, userAssignments,
}: Props) {
  return (
    <Card>
      <SectionHeader tittle="Buscar Miembro" />
      <div className="flex gap-2 mt-3">
        <Input
          type="text"
          placeholder="Documento"
          value={assignDoc}
          onChange={(e) => onDocChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="flex-1 p-2"
        />
        <button
          onClick={onSearch}
          className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Buscar
        </button>
      </div>
      {assignUser && (
        <div className="mt-3 p-3 bg-orange-50 rounded text-sm">
          <p className="font-bold">{assignUser.nombre} {assignUser.apellido}</p>
          <p className="text-gray-600">Doc: {assignUser.documento} | Email: {assignUser.email}</p>
          <p>
            Membresia:{" "}
            <span className={`font-medium ${assignUser.membresiaActiva ? "text-green-600" : "text-red-500"}`}>
              {assignUser.estadoMembresia}
            </span>
          </p>
          <div className="mt-2">
            <p className="text-xs font-semibold text-gray-500 mb-1">Historial:</p>
            {userAssignments.length === 0 ? (
              <p className="text-xs text-gray-400">Sin membrerias</p>
            ) : (
              userAssignments.map((a) => (
                <div key={a.id} className="text-xs bg-white border rounded p-1.5 mb-1">
                  <span className="font-medium">{a.planName}</span> — {a.startDate} al {a.endDate} ·{" "}
                  <span className={a.status === "ACTIVA" ? "text-green-600" : "text-gray-500"}>{a.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
