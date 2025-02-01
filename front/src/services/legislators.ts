import { apiClient } from ".";
import { GenericAbortSignal } from "axios";
import {
  LegislatorVotesListResponse,
  LegislatorResponse,
  VotesResultsResponse,
} from "../types";

type GetLegislatorParamType = {
  name: string;
};

export const listLegislators = async (
  { name }: GetLegislatorParamType,
  signal?: GenericAbortSignal
) => {
  const { data } = await apiClient.get<LegislatorResponse[]>("/legislators", {
    params: { ...(name && { name }) },
    signal,
  });

  return data.map((legislator) => ({
    ...legislator,
    opposedBills: legislator.opposed_bills,
    supportedBills: legislator.supported_bills,
  }));
};

export const getLegislator = async (
  id: string,
  signal?: GenericAbortSignal
) => {
  const { data } = await apiClient.get<LegislatorResponse>(
    `/legislators/${id}`,
    { signal }
  );

  return {
    ...data,
    opposedBills: data.opposed_bills,
    supportedBills: data.supported_bills,
  };
};

export const getLegislatorVotes = async (
  id: string,
  signal?: GenericAbortSignal
) => {
  const { data } = await apiClient.get<LegislatorVotesListResponse>(
    `/legislators/${id}/votes`,
    { signal }
  );
  if (!data) return { supportedVotes: [], opposedVotes: [] };

  const mapVotes = (votes: VotesResultsResponse[]) =>
    votes.map(({ legislator_id, vote_id, vote_type, id, bill_title, bill_id }) => ({
      id: parseInt(id),
      legislatorId: parseInt(legislator_id),
      voteId: parseInt(vote_id),
      voteType: parseInt(vote_type),
      billTitle: bill_title,
      billId: parseInt(bill_id),
    }));

  return {
    supportedVotes: mapVotes(data.supported_votes),
    opposedVotes: mapVotes(data.opposed_votes),
  };
};
