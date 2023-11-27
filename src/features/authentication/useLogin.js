import { useNavigate } from "react-router-dom";
import { login as loginFromApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginFromApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error", error.message);
      toast.error(error.message);
    },
  });

  return { isLoading, login };
}
