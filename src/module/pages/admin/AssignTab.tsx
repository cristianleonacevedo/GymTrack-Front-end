import { useState } from "react";
import { Button, Input } from "../../../design/atomic";
import { SectionHeader } from "../../../design/molecule";
import { assignMembership } from "../../services/assignments.service";
import type { User, MembershipPlan } from "../../types/user.types";

type AssignFormState = {
  userId: string;
  planId: string;
  startDate: string;
  paymentMethod: string;
  paymentReference: string;
};

const emptyForm: AssignFormState = {
  userId: "",
  planId: "",
  startDate: new Date().toISOString().split("T")[0],
  paymentMethod: "EFECTIVO",
  paymentReference: "",
};

type Props = {
  users: User[];
  plans: MembershipPlan[];
};

export default function AssignTab({ users, plans }: Props) {
  const [form, setForm] = useState<AssignFormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await assignMembership({
        userId: Number(form.userId),
        planId: Number(form.planId),
        startDate: form.startDate,
        paymentMethod: form.paymentMethod,
        paymentReference: form.paymentReference,
      });
      setMsg("Membresía asignada correctamente.");
      setForm(emptyForm);
    } catch {
      setMsg("Error al asignar membresía. Revisa los datos.");
    } finally {
      setLoading(false);
    }
  };

  const activePlans = plans.filter((p) => p.active);
  const members = users.filter((u) => u.rol === "MIEMBRO");

  return (
    <div className="max-w-lg">
      <SectionHeader tittle="Asignar Membresía" />

      {msg && (
        <p
          className={`p-3 rounded my-3 text-sm ${
            msg.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {msg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm text-gray-600 block mb-1">Miembro *</label>
          <select
            className="w-full border-2 rounded p-2 bg-gray-100"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
            required
          >
            <option value="">-- Seleccionar miembro --</option>
            {members.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} {u.apellido} ({u.documento})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Plan *</label>
          <select
            className="w-full border-2 rounded p-2 bg-gray-100"
            value={form.planId}
            onChange={(e) => setForm({ ...form, planId: e.target.value })}
            required
          >
            <option value="">-- Seleccionar plan --</option>
            {activePlans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - ${p.price?.toLocaleString()} ({p.durationDays} días)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Fecha de inicio *
          </label>
          <Input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="w-full p-2"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Método de pago *
          </label>
          <select
            className="w-full border-2 rounded p-2 bg-gray-100"
            value={form.paymentMethod}
            onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
          >
            <option value="EFECTIVO">Efectivo</option>
            <option value="TARJETA">Tarjeta</option>
            <option value="TRANSFERENCIA">Transferencia</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Referencia de pago
          </label>
          <Input
            type="text"
            value={form.paymentReference}
            onChange={(e) => setForm({ ...form, paymentReference: e.target.value })}
            className="w-full p-2"
            placeholder="Ej: REC-001"
          />
        </div>

        <Button
          text={loading ? "Asignando..." : "Asignar Membresía"}
          type="submit"
        />
      </form>
    </div>
  );
}
