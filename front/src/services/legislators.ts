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
    noBills: legislator.no_bills,
    yesBills: legislator.yes_bills,
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

  const { id: legislator_id, no_bills, yes_bills, ...legislator } = data;

  return {
    ...legislator,
    id: parseInt(legislator_id),
    noBills: parseInt(no_bills),
    yesBills: parseInt(yes_bills),
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
  if (!data) return { yesVotes: [], noVotes: [] };

  const mapVotes = (votes: VotesResultsResponse[]) =>
    votes.map(
      ({ legislator_id, vote_id, vote_type, id, bill_title, bill_id }) => ({
        id: parseInt(id),
        legislatorId: parseInt(legislator_id),
        voteId: parseInt(vote_id),
        voteType: parseInt(vote_type),
        billTitle: bill_title,
        billId: parseInt(bill_id),
      })
    );

  return {
    yesVotes: mapVotes(data.yes_votes),
    noVotes: mapVotes(data.no_votes),
  };
};
