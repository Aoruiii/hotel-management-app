import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: todayActivity, isLoading: isLoadingToday } = useQuery({
    queryKey: ["bookings", "today"],
    queryFn: () => getStaysTodayActivity(),
  });

  return { todayActivity, isLoadingToday };
}
