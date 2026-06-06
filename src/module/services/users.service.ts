import { apiClient } from "../../core/api/api-client";
import { ENDPOINTS } from "../../core/api/api-config";
import type { User } from "../types/user.types";

export const getAllUsers = async (): Promise<User[]> => {
    const res = await apiClient.get(ENDPOINTS.USERS);
    return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const res = await apiClient.get(`${ENDPOINTS.USERS}/${id}`);
    return res.data;
};

export const getUserByDocumento = async (documento: string): Promise<User> => {
    const res = await apiClient.get(`${ENDPOINTS.USERS}/documento/${documento}`);
    return res.data;
};
