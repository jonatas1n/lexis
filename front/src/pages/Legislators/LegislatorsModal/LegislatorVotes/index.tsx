import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { Grid, Tabs } from "@chakra-ui/react";
import { Legislator } from "@/types";
import { useLegislatorVotes } from "@/hooks/api/queries/legislators";
import { VoteResultItem } from "@/components/VoteItem";

export const LegislatorVotes = ({ legislator }: { legislator: Legislator }) => {
  const { data: legislatorVotes } = useLegislatorVotes(
    legislator.id?.toString()
  );
  const { noVotes, supportedVotes } = legislatorVotes ?? {};
  return (
    <Tabs.Root variant="subtle" defaultValue="yesBills">
      <Tabs.List width="100%" justifyContent="space-between">
        <Tabs.Trigger
          width="100%"
          justifyContent="center"
          value="yesBills"
        >
          <IoMdHeart />
          Support Votes
        </Tabs.Trigger>
        <Tabs.Trigger width="100%" justifyContent="center" value="noBills">
          <IoMdHeartDislike />
          Oppose Votes
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="yesBills">
        <Grid gap={2}>
          {supportedVotes &&
            supportedVotes.map((vote) => (
              <VoteResultItem voteResult={vote} key={vote.id} />
            ))}
        </Grid>
      </Tabs.Content>
      <Tabs.Content value="noBills">
        <Grid gap={2}>
          {noVotes &&
            noVotes.map((vote) => (
              <VoteResultItem voteResult={vote} key={vote.id} />
            ))}
        </Grid>
      </Tabs.Content>
    </Tabs.Root>
  );
};
