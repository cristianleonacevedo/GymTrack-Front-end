import { apiClient } from "../../core/api/api-client";
import type { RegisterFormData } from "../types/auth.types";

export const registerRequest = async (data: RegisterFormData): Promise<void> => {
  const res = await apiClient.post("/api/auth/register", data);
  return res.data;
};
