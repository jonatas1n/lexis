import { useQuery } from "@tanstack/react-query";
import { getBillVotes } from "@/services/bills";
import { ApiError, BillVotesList } from "@/types";

const BILL_QUERY_KEY = "bill-votes";

export const useBillVotes = (id: string) => {
  return useQuery<BillVotesList, ApiError, BillVotesList>({
    queryKey: [BILL_QUERY_KEY, id],
    queryFn: ({ signal }) => getBillVotes(id, signal),
    enabled: !!id,
  })
};
