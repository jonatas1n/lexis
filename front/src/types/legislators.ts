import { VotesResults, VotesResultsResponse } from "./votes-results";

export type Legislator = {
  id: number;
  name: string;
  supportedBills: number;
  opposedBills: number;
};

export type LegislatorVotesList = {
  supportedVotes: VotesResults[];
  opposedVotes: VotesResults[]
};

export type LegislatorVotesListResponse = {
  supported_votes: VotesResultsResponse[];
  opposed_votes: VotesResultsResponse[];
}

export type LegislatorResponse = {
  id: number;
  name: string;
  supported_bills: number;
  opposed_bills: number;
};