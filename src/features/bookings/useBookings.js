import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter the bookings from API
  const filterValue = searchParams.get("status");
  const filter =
    filterValue === "all" || !filterValue
      ? null
      : { field: "status", value: filterValue };

  // Sort the bookings from API
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [sortField, order] = sortValue.split("-");
  const sortBy = { field: sortField, order: order };

  // Pagination
  const page = Number(searchParams.get("page")) || 1;

  // Data Fetching
  const {
    data: { data: bookings, count: numResults } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Data Pre-Fetching
  const numPages = Math.ceil(numResults / PAGE_SIZE);
  if (page < numPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > numPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, numResults, isLoading, error };
}
