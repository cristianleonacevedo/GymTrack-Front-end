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

      try {
        const [classesData, membershipData, activityData] =
          await Promise.all([
            getClasses(),
            getMembership(),
            getActivity()
          ]);

        setClasses(classesData);
        setMembership(membershipData);
        setActivity(activityData);
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    classes,
    membership,
    activity,
    loading,
    error
  };
}