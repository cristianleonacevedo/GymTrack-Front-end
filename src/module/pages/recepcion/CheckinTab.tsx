import { Card, Input } from "../../../design/atomic";
import { SectionHeader } from "../../../design/molecule";
import type { CheckIn } from "../../types/user.types";

type Props = {
  documento: string;
  onDocumentoChange: (v: string) => void;
  onCheckin: () => void;
  checkinMsg: string;
  checkinError: string;
  activeCheckins: CheckIn[];
  loading: boolean;
  onCheckout: (doc: string) => void;
};

export default function CheckinTab({
  documento, onDocumentoChange, onCheckin,
  checkinMsg, checkinError,
  activeCheckins, loading, onCheckout,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <SectionHeader tittle="Registrar Entrada" />
        <div className="flex gap-2 mt-3">
          <Input
            type="text"
            placeholder="Documento del miembro"
            value={documento}
            onChange={(e) => onDocumentoChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onCheckin()}
            className="flex-1 p-2"
          />
          <button
            onClick={onCheckin}
            className="px-4 py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600"
          >
            Check-in
          </button>
        </div>
        {checkinMsg && <p className="mt-3 text-sm text-green-700 bg-green-50 p-2 rounded">{checkinMsg}</p>}
        {checkinError && <p className="mt-3 text-sm text-red-700 bg-red-50 p-2 rounded">{checkinError}</p>}
      </Card>

      <Card>
        <SectionHeader tittle="Miembros en el Gimnasio" />
        {loading ? (
          <p className="text-gray-500 text-sm">Cargando...</p>
        ) : activeCheckins.length === 0 ? (
          <p className="text-gray-400 text-sm mt-2">No hay miembros en el gimnasio.</p>
        ) : (
          <div className="space-y-2 mt-2">
            {activeCheckins.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded p-2 text-sm">
                <div>
                  <p className="font-medium">{c.memberName}</p>
                  <p className="text-gray-500 text-xs">Entrada: {c.hora_entrada} · Doc: {c.documento}</p>
                </div>
                <button
                  onClick={() => onCheckout(c.documento)}
                  className="text-xs px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                >
                  Check-out
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
