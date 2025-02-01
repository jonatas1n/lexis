import { Legislator, LegislatorResponse } from "./legislators";

export type Bill = {
  id: number;
  title: string;
  sponsorId: number;
  sponsorName?: string;
  yesVotes: number;
  noVotes: number;
};

export type BillResponse = {
  id: string;
  title: string;
  sponsor_id: string;
  sponsor_name?: string;
  yes_votes: number;
  no_votes: number;
};

export type BillVotesListResponse = {
  yes_votes: LegislatorResponse[];
  no_votes: LegislatorResponse[];
};

export type BillVotesList = {
  yesVoters: Legislator[];
  noVoters: Legislator[];
};
