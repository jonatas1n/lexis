export type VotesResults = {
  id: number;
  legislatorId: number;
  voteId: number
  voteType: number;
  billId: number;
  billTitle: string;
};

export type VotesResultsResponse = {
  id: string;
  legislator_id: string;
  vote_id: string;
  vote_type: "1"|"2";
  bill_id: string;
  bill_title: string;
};
