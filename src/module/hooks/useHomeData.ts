import { useEffect, useState } from "react";
import { getClasses, getMembership, getActivity } from "../services/Homer.services";
import type { GymClass } from "../types/class.types";
import type { Membership, Activity } from "../types/user.types";

export function useHomeData() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Promise.allSettled: si 1 falla, los demás igual se resuelven
      const [classesResult, membershipResult, activityResult] =
        await Promise.allSettled([
          getClasses(),
          getMembership(),
          getActivity(),
        ]);

      if (classesResult.status === "fulfilled") {
        setClasses(classesResult.value);
      }

      if (membershipResult.status === "fulfilled") {
        setMembership(membershipResult.value);
      }

      if (activityResult.status === "fulfilled") {
        setActivity(activityResult.value);
      }

      // Solo mostrar error si TODOS fallaron
      const allFailed =
        classesResult.status === "rejected" &&
        membershipResult.status === "rejected" &&
        activityResult.status === "rejected";

      if (allFailed) {
        setError("No se pudo conectar con el servidor. Intenta más tarde.");
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return { classes, membership, activity, loading, error };
}
