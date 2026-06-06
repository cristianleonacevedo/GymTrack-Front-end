import { Button, Card, Input } from "../../../design/atomic";
import { SectionHeader } from "../../../design/molecule";
import type { MembershipPlan, MembershipAssignment } from "../../types/user.types";

type AssignForm = { planId: string; startDate: string; paymentMethod: string; paymentReference: string };
type RenewForm = { assignmentId: string; planId: string; paymentMethod: string; paymentReference: string };

const PAYMENT_OPTIONS = [
  { value: "EFECTIVO", label: "Efectivo" },
  { value: "TARJETA", label: "Tarjeta" },
  { value: "TRANSFERENCIA", label: "Transferencia" },
];

type Props = {
  plans: MembershipPlan[];
  userAssignments: MembershipAssignment[];
  assignForm: AssignForm;
  onAssignChange: (f: AssignForm) => void;
  onAssign: (e: React.FormEvent) => void;
  assignMsg: string;
  renewForm: RenewForm;
  onRenewChange: (f: RenewForm) => void;
  onRenew: (e: React.FormEvent) => void;
  renewMsg: string;
};

function MsgBanner({ msg }: { msg: string }) {
  if (!msg) return null;
  const ok = msg.includes("✅");
  return (
    <p className={`text-sm p-2 rounded mt-2 ${ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
      {msg}
    </p>
  );
}

function PaymentSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select className="w-full border-2 rounded p-2 bg-gray-100 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
      {PAYMENT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export default function AssignMembershipForms({
  plans, userAssignments,
  assignForm, onAssignChange, onAssign, assignMsg,
  renewForm, onRenewChange, onRenew, renewMsg,
}: Props) {
  return (
    <div className="space-y-4">
      <Card>
        <SectionHeader tittle="Asignar Nueva Membresia" />
        <MsgBanner msg={assignMsg} />
        <form onSubmit={onAssign} className="space-y-2 mt-2">
          <select
            className="w-full border-2 rounded p-2 bg-gray-100 text-sm"
            value={assignForm.planId}
            onChange={(e) => onAssignChange({ ...assignForm, planId: e.target.value })}
            required
          >
            <option value="">-- Seleccionar plan --</option>
            {plans.map((p) => <option key={p.id} value={p.id}>{p.name} - ${p.price?.toLocaleString()}</option>)}
          </select>
          <Input type="date" value={assignForm.startDate}
            onChange={(e) => onAssignChange({ ...assignForm, startDate: e.target.value })}
            className="w-full p-2" required />
          <PaymentSelect value={assignForm.paymentMethod} onChange={(v) => onAssignChange({ ...assignForm, paymentMethod: v })} />
          <Input type="text" placeholder="Referencia de pago" value={assignForm.paymentReference}
            onChange={(e) => onAssignChange({ ...assignForm, paymentReference: e.target.value })}
            className="w-full p-2" />
          <Button text="Asignar Membresia" type="submit" />
        </form>
      </Card>

      {userAssignments.length > 0 && (
        <Card>
          <SectionHeader tittle="Renovar Membresia" />
          <MsgBanner msg={renewMsg} />
          <form onSubmit={onRenew} className="space-y-2 mt-2">
            <select
              className="w-full border-2 rounded p-2 bg-gray-100 text-sm"
              value={renewForm.assignmentId}
              onChange={(e) => onRenewChange({ ...renewForm, assignmentId: e.target.value })}
              required
            >
              <option value="">-- Seleccionar membresia a renovar --</option>
              {userAssignments.map((a) => (
                <option key={a.id} value={a.id}>{a.planName} (vence {a.endDate}) - {a.status}</option>
              ))}
            </select>
            <select
              className="w-full border-2 rounded p-2 bg-gray-100 text-sm"
              value={renewForm.planId}
              onChange={(e) => onRenewChange({ ...renewForm, planId: e.target.value })}
              required
            >
              <option value="">-- Nuevo plan --</option>
              {plans.map((p) => <option key={p.id} value={p.id}>{p.name} - ${p.price?.toLocaleString()}</option>)}
            </select>
            <PaymentSelect value={renewForm.paymentMethod} onChange={(v) => onRenewChange({ ...renewForm, paymentMethod: v })} />
            <Input type="text" placeholder="Referencia de pago" value={renewForm.paymentReference}
              onChange={(e) => onRenewChange({ ...renewForm, paymentReference: e.target.value })}
              className="w-full p-2" />
            <Button text="Renovar Membresia" type="submit" variant="secondary" />
          </form>
        </Card>
      )}
    </div>
  );
}
