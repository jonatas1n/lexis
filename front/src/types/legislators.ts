import { VotesResults, VotesResultsResponse } from "./votes-results";

export type Legislator = {
  id: number;
  name: string;
  yesBills: number;
  noBills: number;
};

export type LegislatorVotesList = {
  yesVotes: VotesResults[];
  noVotes: VotesResults[]
};

export type LegislatorVotesListResponse = {
  yes_votes: VotesResultsResponse[];
  no_votes: VotesResultsResponse[];
}

export type LegislatorResponse = {
  id: string;
  name: string;
  yes_bills: string;
  no_bills: string;
};