import { listLegislators } from "@/services/legislators";
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ApiError, Legislator } from "@/types";

const LEGISLATOR_LIST_QUERY_KEY = "legislator";

type Params = {
  name: string;
};

type OptionType = UseQueryOptions<Legislator[], ApiError, Legislator[]>;

export const useLegislators = ({ name }: Params, options?: OptionType) => {
  return useQuery<Legislator[], ApiError, Legislator[]>({
    queryKey: [LEGISLATOR_LIST_QUERY_KEY, name],
    queryFn: async ({ signal }) => {
      const data = await listLegislators({ name }, signal);

      return data.map(legislator => ({
        id: parseInt(legislator.id),
        name: legislator.name,
        noBills: parseInt(legislator.no_bills),
        yesBills: parseInt(legislator.yes_bills),
      }));
    },
    ...options,
  });
}