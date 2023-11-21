import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useQueryCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}
