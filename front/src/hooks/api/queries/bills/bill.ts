import { getBill } from "@/services/bills";
import { ApiError, Bill } from "@/types";
import { useQuery } from "@tanstack/react-query";

const LEGISLATOR_QUERY_KEY = 'legislators';

export const useBill = (id: string) => {
  return useQuery<Bill, ApiError, Bill>({
    queryKey: [LEGISLATOR_QUERY_KEY, id],
    queryFn: ({ signal }) => getBill(id, signal),
    enabled: !!id,
  })
};