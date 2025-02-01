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

export interface BillPageResult {
  results: Bill[];
  total: number;
  offset: number;
  limit: number;
}