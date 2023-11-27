import { useNavigate } from "react-router-dom";
import { logout as logoutFromApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isLoggingout, mutate: logout } = useMutation({
    mutationFn: () => logoutFromApi(),
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoggingout, logout };
}
