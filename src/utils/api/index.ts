import { BASE_URL } from "@constants/environments";
import STORAGE_KEYS from "@constants/storage";
import getCookie from "@utils/storage/cookie/getCookie";
import CustomError from "src/utils/api/error.ts";
import fetchWithInterceptors from "src/utils/api/fetchInterceptors.ts";

interface Interceptors {
  request?: (url: string, options: RequestInit) => Promise<RequestInit> | RequestInit;
  response?: <T>(response: Response) => Promise<T> | T;
}

export function generateDefaultHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const accessToken = getCookie<string>(STORAGE_KEYS.TOKEN);
  if (accessToken) {
    headers.Authorization = accessToken;
  }
  return headers;
}

class FetchWrapper {
  private baseUrl: string;

  private interceptors: Interceptors;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.interceptors = {
      response: async <T>(response: Response): Promise<T> => {
        if (!response.ok) {
          const errorMessage = await response.text();
          return Promise.reject(
            new CustomError(errorMessage || "서버에 문제가 발생하였습니다.", response.status),
          );
        }
        return response.json();
      },
    };
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    return fetchWithInterceptors<T>(`${this.baseUrl}${url}`, {
      ...options,
      interceptors: this.interceptors,
    });
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      credentials: "include",
    });
  }

  async put<T, U>(url: string, data: U): Promise<T> {
    return this.request<T>(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        ...generateDefaultHeaders(),
      },
      credentials: "include",
    });
  }

  async post<T, U>(url: string, data?: U): Promise<T> {
    return this.request<T>(url, {
      method: "POST",
      body: data ? JSON.stringify(data) : null,
      headers: {
        ...generateDefaultHeaders(),
      },
      credentials: "include",
    });
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: "DELETE",
    });
  }
}

const http = new FetchWrapper(BASE_URL);

export default http;
