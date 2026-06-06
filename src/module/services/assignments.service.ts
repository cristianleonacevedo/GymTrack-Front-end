import { apiClient } from "../../core/api/api-client";
import { ENDPOINTS } from "../../core/api/api-config";
import type { MembershipAssignment } from "../types/user.types";

export const assignMembership = async (data: {
    userId: number;
    planId: number;
    startDate: string;
    paymentMethod: string;
    paymentReference: string;
}): Promise<MembershipAssignment> => {
    const res = await apiClient.post(ENDPOINTS.ASSIGNMENTS, data);
    return res.data;
};

export const getMemberAssignments = async (memberId: number): Promise<MembershipAssignment[]> => {
    const res = await apiClient.get(`${ENDPOINTS.ASSIGNMENTS}/member/${memberId}`);
    return res.data;
};

export const renewMembership = async (data: {
    assignmentId: number;
    planId: number;
    paymentMethod: string;
    paymentReference: string;
}): Promise<MembershipAssignment> => {
    const res = await apiClient.post(`${ENDPOINTS.ASSIGNMENTS}/renew`, data);
    return res.data;
};
