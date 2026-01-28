import { API_BASE_URL } from "./client";

export const api = {
  shorten: `${API_BASE_URL}/shorten`,

  urls: `${API_BASE_URL}/urls`,
  deleteUrl: (id: string) =>
    `${API_BASE_URL}/urls/${id}`,

  details: (code: string) =>
    `${API_BASE_URL}/details/${code}`,

  analytics: (code: string) =>
    `${API_BASE_URL}/analytics/${code}`,

  redirect: (code: string) =>
    `${API_BASE_URL}/${code}`,
};
