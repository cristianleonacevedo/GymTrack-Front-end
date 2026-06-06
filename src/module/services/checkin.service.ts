import { apiClient } from "../../core/api/api-client";
import { ENDPOINTS } from "../../core/api/api-config";
import type { CheckIn } from "../types/user.types";

export const doCheckin = async (documento: string): Promise<CheckIn> => {
    const res = await apiClient.post(ENDPOINTS.CHECKIN, { documento });
    return res.data;
};

export const doCheckout = async (documento: string): Promise<CheckIn> => {
    const res = await apiClient.post(`${ENDPOINTS.CHECKIN}/checkout`, { documento });
    return res.data;
};

export const getActiveCheckins = async (): Promise<CheckIn[]> => {
    const res = await apiClient.get(`${ENDPOINTS.CHECKIN}/active`);
    return res.data;
};

export const getMyCheckins = async (): Promise<CheckIn[]> => {
    const res = await apiClient.get(`${ENDPOINTS.CHECKIN}/me`);
    return res.data;
};
