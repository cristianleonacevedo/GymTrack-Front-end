import { useState } from "react";
import { Button } from "../../../design/atomic";
import { SectionHeader } from "../../../design/molecule";
import { createPlan, deactivatePlan, activatePlan, updatePlan } from "../../services/plans.service";
import type { MembershipPlan } from "../../types/user.types";
import PlanForm from "./PlanForm";
import PlansTable from "./PlansTable";

type PlanFormState = {
  name: string; description: string; durationDays: number;
  price: number; maxGroupClasses: string | number; includesLocker: boolean;
};

const emptyForm: PlanFormState = { name: "", description: "", durationDays: 30, price: 0, maxGroupClasses: "", includesLocker: false };

type Props = { plans: MembershipPlan[]; loading: boolean; onRefresh: () => void };

export default function PlansTab({ plans, loading, onRefresh }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [form, setForm] = useState<PlanFormState>(emptyForm);

  const handleEdit = (plan: MembershipPlan) => {
    setEditingPlan(plan);
    setForm({ name: plan.name, description: plan.description, durationDays: plan.durationDays, price: plan.price, maxGroupClasses: plan.maxGroupClasses ?? "", includesLocker: plan.includesLocker });
    setShowForm(true);
  };

  const handleCancel = () => { setShowForm(false); setEditingPlan(null); setForm(emptyForm); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<MembershipPlan, "id" | "active"> = { ...form, maxGroupClasses: form.maxGroupClasses === "" ? null : Number(form.maxGroupClasses) };
    try {
      editingPlan ? await updatePlan(editingPlan.id, payload) : await createPlan(payload);
      handleCancel(); onRefresh();
    } catch { alert("Error al guardar el plan"); }
  };

  const handleToggle = async (plan: MembershipPlan) => {
    try { plan.active ? await deactivatePlan(plan.id) : await activatePlan(plan.id); onRefresh(); }
    catch { alert("Error al cambiar estado del plan"); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <SectionHeader tittle="Planes de Membresia" />
        {!showForm && <Button text="+ Nuevo Plan" onClick={() => setShowForm(true)} />}
      </div>
      {showForm && <PlanForm form={form} editing={!!editingPlan} onChange={setForm} onSubmit={handleSave} onCancel={handleCancel} />}
      {loading ? <p className="text-gray-500 text-center">Cargando planes...</p> : <PlansTable plans={plans} onEdit={handleEdit} onToggle={handleToggle} />}
    </div>
  );
}
