import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingFromApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingFromApi(id),
    onSuccess: () => {
      toast.success(`Successfully delete booking`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteBooking };
}
