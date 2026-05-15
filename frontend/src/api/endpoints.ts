import { get } from "./client";

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

export function fetchRoot() {
  return get<{ message: string; status: string }>("/");
}

export function fetchHealth() {
  return get<HealthStatus>("/api/healthz");
}

export function fetchServices() {
  return get<Service[]>("/api/services");
}
