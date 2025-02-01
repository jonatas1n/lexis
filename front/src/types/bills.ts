export type Bill = {
  id: number;
  title: string;
  sponsorId: number;
  supportVotes: number;
  opposedVotes: number;
};

export type BillResponse = {
  id: string;
  title: string;
  sponsorId: string;
  support_votes: number;
  opposed_votes: number;
};

export interface BillPageResult {
  results: Bill[];
  total: number;
  offset: number;
  limit: number;
}