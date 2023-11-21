import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editSettings } = useMutation({
    mutationFn: (newSetting) => updateSetting(newSetting),
    onSuccess: () => {
      toast.success("Successfully update settings.");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(err.message);
    },
  });
  return { editSettings, isEditing };
}
