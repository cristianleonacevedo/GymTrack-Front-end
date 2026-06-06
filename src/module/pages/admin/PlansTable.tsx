import type { MembershipPlan } from "../../types/user.types";

type Props = {
  plans: MembershipPlan[];
  onEdit: (plan: MembershipPlan) => void;
  onToggle: (plan: MembershipPlan) => void;
};

export default function PlansTable({ plans, onEdit, onToggle }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-orange-100">
            {["Nombre","Precio","Duracion","Clases","Casillero","Estado","Acciones"].map((h) => (
              <th key={h} className="border p-2 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p.id} className={`hover:bg-gray-50 ${!p.active ? "opacity-50" : ""}`}>
              <td className="border p-2 font-medium">{p.name}</td>
              <td className="border p-2">${p.price?.toLocaleString()}</td>
              <td className="border p-2">{p.durationDays} dias</td>
              <td className="border p-2">{p.maxGroupClasses === null ? "Ilimitadas" : p.maxGroupClasses}</td>
              <td className="border p-2">{p.includesLocker ? "Si" : "No"}</td>
              <td className="border p-2">
                <span className={`px-2 py-0.5 rounded-full text-xs text-white ${p.active ? "bg-green-500" : "bg-gray-400"}`}>
                  {p.active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="border p-2">
                <div className="flex gap-1">
                  <button onClick={() => onEdit(p)} className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Editar</button>
                  <button onClick={() => onToggle(p)} className={`text-xs px-2 py-1 text-white rounded ${p.active ? "bg-red-400 hover:bg-red-500" : "bg-green-500 hover:bg-green-600"}`}>
                    {p.active ? "Desactivar" : "Activar"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {plans.length === 0 && (
            <tr><td colSpan={7} className="text-center p-4 text-gray-400">No hay planes registrados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
