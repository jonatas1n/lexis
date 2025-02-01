import { getLegislator } from "@/services/legislators";
import { ApiError, Legislator } from "@/types";
import { useQuery } from "@tanstack/react-query";

const LEGISLATOR_QUERY_KEY = "votes";

export const useLegislator = (id: string) => {
  return useQuery<Legislator, ApiError, Legislator>({
    queryKey: [LEGISLATOR_QUERY_KEY, id],
    queryFn: ({ signal }) => getLegislator(id, signal),
    enabled: !!id,
  });
};
