import axios from "axios";

const API_BASE = process.env.API_URL ?? "http://localhost:3333";

const serverApi = axios.create({
  baseURL: API_BASE + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function serverFetch<T>(path: string): Promise<T> {
  const { data } = await serverApi.get<{ success: boolean; data: T }>(path);
  return data.data;
}

export async function serverFetchWithToken<T>(path: string, token: string): Promise<T> {
  const { data } = await serverApi.get<{ success: boolean; data: T }>(path, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
}
