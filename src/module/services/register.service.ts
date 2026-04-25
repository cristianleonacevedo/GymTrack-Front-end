import { apiClient } from "../../core/api/api-client";

export const registerRequest = async (data: any) => {
  const res = await apiClient.post("/api/auth/register", data);
  return res.data;
};