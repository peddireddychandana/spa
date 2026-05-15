export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
};

export type HealthStatus = {
  status: string;
};

export async function fetchRoot(): Promise<{ message: string; status: string }> {
  const res = await fetch(import.meta.env.VITE_API_URL);
  if (!res.ok) throw new Error("Root check failed");
  return res.json();
}

export async function fetchHealth(): Promise<HealthStatus> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/healthz`);
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}
