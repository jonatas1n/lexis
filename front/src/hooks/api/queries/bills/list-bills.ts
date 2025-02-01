import { listBills } from "@/services/bills";
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ApiError, Bill } from "@/types";
import { BILL_LIST_QUERY_PARAM } from "@/constants";

type Params = {
  title?: string;
  sponsorId?: string;
};

type OptionType = UseQueryOptions<Bill[], ApiError, Bill[]>;

export const useBills = ({ title, sponsorId }: Params, options?: OptionType) => {
  return useQuery<Bill[], ApiError, Bill[]>({
    queryKey: [BILL_LIST_QUERY_PARAM, title, sponsorId],
    queryFn: ({ signal }) => listBills({ title, sponsorId }, signal),
    ...options,
  });
}