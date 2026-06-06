import { apiClient } from "../../core/api/api-client";
import type { AuthResponse, User } from "../types/user.types";

export const loginRequest = async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await apiClient.post("/api/auth/login", data);
    return res.data;
};

export const getMe = async (): Promise<User> => {
    const res = await apiClient.get("/api/auth/me");
    return res.data;
};
