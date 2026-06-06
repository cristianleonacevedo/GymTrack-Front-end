import { apiClient } from "../../core/api/api-client";
import { ENDPOINTS } from "../../core/api/api-config";
import type { MembershipPlan } from "../types/user.types";

export const getActivePlans = async (): Promise<MembershipPlan[]> => {
    const res = await apiClient.get(ENDPOINTS.PLANS_ACTIVE);
    return res.data;
};

export const getAllPlans = async (): Promise<MembershipPlan[]> => {
    const res = await apiClient.get(ENDPOINTS.PLANS_ALL);
    return res.data;
};

export const createPlan = async (data: Omit<MembershipPlan, "id" | "active">): Promise<MembershipPlan> => {
    const res = await apiClient.post(ENDPOINTS.PLANS_ALL, data);
    return res.data;
};

export const updatePlan = async (id: number, data: Partial<MembershipPlan>): Promise<MembershipPlan> => {
    const res = await apiClient.put(`${ENDPOINTS.PLANS_ALL}/${id}`, data);
    return res.data;
};

export const deactivatePlan = async (id: number): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.PLANS_ALL}/${id}`);
};

export const activatePlan = async (id: number): Promise<MembershipPlan> => {
    const res = await apiClient.patch(`${ENDPOINTS.PLANS_ALL}/${id}/activate`);
    return res.data;
};
