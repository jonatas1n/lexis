import { useQuery } from "@tanstack/react-query";
import { getLegislatorVotes } from "@/services/legislators";
import { ApiError, LegislatorVotesList } from "@/types";

const LEGISLATOR_QUERY_KEY = "legislators-votes";

export const useLegislatorVotes = (id: string) => {
  return useQuery<LegislatorVotesList, ApiError, LegislatorVotesList>({
    queryKey: [LEGISLATOR_QUERY_KEY, id],
    queryFn: ({ signal }) => getLegislatorVotes(id, signal),
    enabled: !!id,
  });
};
