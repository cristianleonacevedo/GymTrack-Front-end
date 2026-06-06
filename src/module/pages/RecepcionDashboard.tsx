import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../../design/molecule";
import { doCheckin, doCheckout, getActiveCheckins } from "../services/checkin.service";
import { getUserByDocumento } from "../services/users.service";
import { getMemberAssignments, assignMembership, renewMembership } from "../services/assignments.service";
import { getAllPlans } from "../services/plans.service";
import type { CheckIn, User, MembershipAssignment, MembershipPlan } from "../types/user.types";
import CheckinTab from "./recepcion/CheckinTab";
import MemberSearch from "./recepcion/MemberSearch";
import AssignMembershipForms from "./recepcion/AssignMembershipForms";

type Tab = "checkin" | "asignar";

const emptyAssign = { planId: "", startDate: new Date().toISOString().split("T")[0], paymentMethod: "EFECTIVO", paymentReference: "" };
const emptyRenew = { assignmentId: "", planId: "", paymentMethod: "EFECTIVO", paymentReference: "" };

const TAB_CONFIG: { key: Tab; label: string; icon: string }[] = [
  { key: "checkin", label: "Check-in / Check-out", icon: "📋" },
  { key: "asignar", label: "Gestión de Membresías", icon: "💳" },
];

function RecepcionDashboard() {
  const [tab, setTab] = useState<Tab>("checkin");
  const [documento, setDocumento] = useState("");
  const [checkinMsg, setCheckinMsg] = useState("");
  const [checkinError, setCheckinError] = useState("");
  const [activeCheckins, setActiveCheckins] = useState<CheckIn[]>([]);
  const [loadingCheckins, setLoadingCheckins] = useState(false);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [assignDoc, setAssignDoc] = useState("");
  const [assignUser, setAssignUser] = useState<User | null>(null);
  const [userAssignments, setUserAssignments] = useState<MembershipAssignment[]>([]);
  const [assignForm, setAssignForm] = useState(emptyAssign);
  const [assignMsg, setAssignMsg] = useState("");
  const [renewForm, setRenewForm] = useState(emptyRenew);
  const [renewMsg, setRenewMsg] = useState("");

  const loadActiveCheckins = useCallback(async () => {
    setLoadingCheckins(true);
    try { setActiveCheckins(await getActiveCheckins()); }
    catch { setActiveCheckins([]); }
    finally { setLoadingCheckins(false); }
  }, []);

  const loadPlans = useCallback(async () => {
    try { setPlans((await getAllPlans()).filter((p) => p.active)); }
    catch { setPlans([]); }
  }, []);

  useEffect(() => { loadActiveCheckins(); loadPlans(); }, [loadActiveCheckins, loadPlans]);

  const handleCheckin = async () => {
    if (!documento.trim()) return;
    setCheckinMsg(""); setCheckinError("");
    try {
      const r = await doCheckin(documento);
      setCheckinMsg(`Check-in registrado para: ${r.memberName} a las ${r.hora_entrada}`);
      setDocumento("");
      loadActiveCheckins();
    } catch (e: unknown) {
      setCheckinError(e instanceof Error ? e.message : "Error al registrar check-in. Verifica la membresía.");
    }
  };

  const handleCheckout = async (doc: string) => {
    try {
      const r = await doCheckout(doc);
      setCheckinMsg(`Salida registrada para: ${r.memberName}. Duración: ${r.duracion ?? 0} min`);
      loadActiveCheckins();
    } catch { setCheckinError("Error al registrar salida."); }
  };

  const handleSearch = async () => {
    if (!assignDoc.trim()) return;
    setAssignMsg(""); setRenewMsg("");
    try {
      const user = await getUserByDocumento(assignDoc);
      setAssignUser(user);
      setUserAssignments(await getMemberAssignments(user.id));
    } catch { setAssignUser(null); setAssignMsg("Miembro no encontrado."); }
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignUser) return;
    setAssignMsg("");
    try {
      await assignMembership({ userId: assignUser.id, planId: Number(assignForm.planId), startDate: assignForm.startDate, paymentMethod: assignForm.paymentMethod, paymentReference: assignForm.paymentReference });
      setAssignMsg("Membresía asignada correctamente.");
      setUserAssignments(await getMemberAssignments(assignUser.id));
    } catch { setAssignMsg("Error al asignar membresía."); }
  };

  const handleRenew = async (e: React.FormEvent) => {
    e.preventDefault();
    setRenewMsg("");
    try {
      await renewMembership({ assignmentId: Number(renewForm.assignmentId), planId: Number(renewForm.planId), paymentMethod: renewForm.paymentMethod, paymentReference: renewForm.paymentReference });
      setRenewMsg("Membresía renovada correctamente.");
      if (assignUser) setUserAssignments(await getMemberAssignments(assignUser.id));
    } catch { setRenewMsg("Error al renovar. Verifica que sea renovable."); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-0.5">GymTrack</p>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Recepción</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 animate-fadeIn">
        {/* Tabs */}
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

        {tab === "checkin" && (
          <CheckinTab
            documento={documento} onDocumentoChange={setDocumento}
            onCheckin={handleCheckin} checkinMsg={checkinMsg} checkinError={checkinError}
            activeCheckins={activeCheckins} loading={loadingCheckins} onCheckout={handleCheckout}
          />
        )}
        {tab === "asignar" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MemberSearch
              assignDoc={assignDoc} onDocChange={setAssignDoc}
              onSearch={handleSearch} assignUser={assignUser} userAssignments={userAssignments}
            />
            {assignUser && (
              <AssignMembershipForms
                plans={plans} userAssignments={userAssignments}
                assignForm={assignForm} onAssignChange={setAssignForm} onAssign={handleAssign} assignMsg={assignMsg}
                renewForm={renewForm} onRenewChange={setRenewForm} onRenew={handleRenew} renewMsg={renewMsg}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecepcionDashboard;
