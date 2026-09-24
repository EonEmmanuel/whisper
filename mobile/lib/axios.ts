import { create } from "axios";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";

const API_URL = "https://whisper-npjmn.sevalla.app/api";

const api = create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    // cleanup remove interceptors when components unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [getToken]);

  return api;
};
