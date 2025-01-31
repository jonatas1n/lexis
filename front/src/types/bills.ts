import { StringOrNumber } from ".";

export type Bill = {
  id: StringOrNumber;
  title: string;
  sponsorId: StringOrNumber;
  supportVotes: number;
  opposedVotes: number;
};

export type BillResponse = {
  id: StringOrNumber;
  title: string;
  sponsorId: StringOrNumber;
  support_votes: number;
  opposed_votes: number;
};

export interface BillPageResult {
  results: Bill[];
  total: number;
  offset: number;
  limit: number;
}