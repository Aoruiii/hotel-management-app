import { useMutation } from "@tanstack/react-query";
import { signup as signupFromApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLoading: isSigningup, mutate: signup } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupFromApi({ fullName, email, password }),
    onSuccess: (data) => {
      toast.success("Successfully create a new user");
      //   console.log(data);
    },

    onError: (err) => {
      console.error(err.message);
      toast.error("Could not create this new user");
    },
  });

  return { isSigningup, signup };
}
