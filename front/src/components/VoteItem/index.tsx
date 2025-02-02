import { VotesResults } from "@/types";
import { EntityItem } from "../EntityItem";

type VoteResultItemType = {
  voteResult: VotesResults;
};

export const VoteResultItem = ({ voteResult }: VoteResultItemType) => {
  return <EntityItem title={voteResult.billTitle} />;
};
