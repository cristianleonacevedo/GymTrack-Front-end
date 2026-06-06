import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../../design/molecule";
import { getAllPlans } from "../services/plans.service";
import { getAllUsers } from "../services/users.service";
import type { MembershipPlan, User } from "../types/user.types";
import PlansTab from "./admin/PlansTab";
import MembersTab from "./admin/MembersTab";
import AssignTab from "./admin/AssignTab";

type Tab = "planes" | "miembros" | "asignar";

const TAB_CONFIG: { key: Tab; label: string; icon: string }[] = [
  { key: "planes", label: "Planes", icon: "💳" },
  { key: "miembros", label: "Miembros", icon: "👥" },
  { key: "asignar", label: "Asignar Membresía", icon: "✅" },
];

function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("planes");
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const loadPlans = useCallback(async () => {
    setLoadingPlans(true);
    try {
      const data = await getAllPlans();
      setPlans(data);
    } catch {
      setPlans([]);
    } finally {
      setLoadingPlans(false);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    loadPlans();
    loadUsers();
  }, [loadPlans, loadUsers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-0.5">
            GymTrack
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 animate-fadeIn">
        {/* Tab bar */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6 w-fit">
          {TAB_CONFIG.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-200
                ${tab === key
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fadeIn">
          {tab === "planes" && (
            <PlansTab plans={plans} loading={loadingPlans} onRefresh={loadPlans} />
          )}
          {tab === "miembros" && (
            <MembersTab users={users} loading={loadingUsers} />
          )}
          {tab === "asignar" && (
            <AssignTab users={users} plans={plans} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
