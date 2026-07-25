import api from "@/api/axios";
import { LoginResponse } from "@/types/auth";

export async function login(data: { email: string; password: string }) {
  const response = await api.post<LoginResponse>("/login", data);

  return response.data;
}

export async function logout() {
  await api.post("/logout");
}
