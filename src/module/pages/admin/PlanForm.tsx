import { Button, Card, Input } from "../../../design/atomic";
import type { MembershipPlan } from "../../types/user.types";

type PlanFormState = {
  name: string; description: string; durationDays: number;
  price: number; maxGroupClasses: string | number; includesLocker: boolean;
};

type Props = {
  form: PlanFormState;
  editing: boolean;
  onChange: (f: PlanFormState) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function PlanForm({ form, editing, onChange, onSubmit, onCancel }: Props) {
  return (
    <Card className="mb-6 border-2 border-orange-300">
      <h3 className="font-bold mb-3">{editing ? "Editar Plan" : "Crear Nuevo Plan"}</h3>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-600">Nombre *</label>
          <Input type="text" value={form.name} onChange={(e) => onChange({ ...form, name: e.target.value })} className="w-full p-2 mt-1" required />
        </div>
        <div>
          <label className="text-sm text-gray-600">Precio (COP) *</label>
          <Input type="number" value={form.price} onChange={(e) => onChange({ ...form, price: Number(e.target.value) })} className="w-full p-2 mt-1" required />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Descripcion</label>
          <Input type="text" value={form.description} onChange={(e) => onChange({ ...form, description: e.target.value })} className="w-full p-2 mt-1" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Duracion (dias) *</label>
          <Input type="number" value={form.durationDays} onChange={(e) => onChange({ ...form, durationDays: Number(e.target.value) })} className="w-full p-2 mt-1" required />
        </div>
        <div>
          <label className="text-sm text-gray-600">Max. Clases grupales (vacio = ilimitadas)</label>
          <Input type="number" value={form.maxGroupClasses} onChange={(e) => onChange({ ...form, maxGroupClasses: e.target.value })} className="w-full p-2 mt-1" placeholder="Dejar vacio para ilimitadas" />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" id="locker" checked={form.includesLocker} onChange={(e) => onChange({ ...form, includesLocker: e.target.checked })} />
          <label htmlFor="locker" className="text-sm text-gray-700">Incluye casillero</label>
        </div>
        <div className="md:col-span-2 flex gap-2">
          <Button text={editing ? "Actualizar Plan" : "Crear Plan"} type="submit" />
          <Button text="Cancelar" onClick={onCancel} variant="secondary" />
        </div>
      </form>
    </Card>
  );
}
