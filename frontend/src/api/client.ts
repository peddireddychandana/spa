const BASE_URL = import.meta.env.VITE_API_URL;

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export function get<T>(endpoint: string) {
  return request<T>(endpoint, { method: "GET" });
}

export function post<T>(endpoint: string, body: unknown) {
  return request<T>(endpoint, { method: "POST", body });
}

export function put<T>(endpoint: string, body: unknown) {
  return request<T>(endpoint, { method: "PUT", body });
}

export function del<T = void>(endpoint: string) {
  return request<T>(endpoint, { method: "DELETE" });
}
