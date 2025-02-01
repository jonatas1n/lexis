import { Legislator, LegislatorResponse } from "./legislators";

export type Bill = {
  id: number;
  title: string;
  sponsorId: number;
  yesVotes: number;
  noVotes: number;
};

export type BillResponse = {
  id: string;
  title: string;
  sponsor_id: string;
  yes_votes: number;
  no_votes: number;
};

export type BillVotesListResponse = {
  yes_voters: LegislatorResponse[];
  no_voters: LegislatorResponse[];
};

export type BillVotesList = {
  yesVoters: Legislator[];
  noVoters: Legislator[];
};
