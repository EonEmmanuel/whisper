import { useApi } from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface AuthCallbackResponse {
  user: {
    name: string;
  };
  // add other fields your backend actually returns
}

export const useAuthCallback = () => {
  const api = useApi();

  return useMutation<AuthCallbackResponse, AxiosError>({
    mutationFn: async () => {
      const { data } = await api.post("/auth/callback");
      return data;
    },
  });
};

// import { useApi } from "../lib/axios";
// import { useMutation } from "@tanstack/react-query";

// export const useAuthCallback = () => {
//   const api = useApi();

//   return useMutation({
//     mutationFn: async () => {
//       const { data } = await api.post("/auth/callback");
//       return data;
//     },
//   });
// };
