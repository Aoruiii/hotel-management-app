import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingin, mutate: checkin } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, { isPaid: true, status: "checked-in" }),
    onSuccess: (data) => {
      toast.success(`Successfully checked in #${data.id}`);
      queryClient.invalidateQueries({ active: true });
      //   queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCheckingin, checkin };
}

export default useCheckin;
