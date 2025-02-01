import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { Grid, Tabs } from "@chakra-ui/react";
import { Legislator } from "@/types";
import { useLegislatorVotes } from "@/hooks/api/queries/legislators";
import { VoteResultItem } from "@/components/VoteItem";

export const LegislatorVotes = ({ legislator }: { legislator: Legislator }) => {
  const { data: legislatorVotes } = useLegislatorVotes(
    legislator.id?.toString()
  );
  const { opposedVotes, supportedVotes } = legislatorVotes ?? {};
  return (
    <Tabs.Root variant="subtle" defaultValue="supportedBills">
      <Tabs.List width="100%" justifyContent="space-between">
        <Tabs.Trigger
          width="100%"
          justifyContent="center"
          value="supportedBills"
        >
          <IoMdHeart />
          Support Votes
        </Tabs.Trigger>
        <Tabs.Trigger width="100%" justifyContent="center" value="opposedBills">
          <IoMdHeartDislike />
          Oppose Votes
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="supportedBills">
        <Grid gap={2}>
          {supportedVotes &&
            supportedVotes.map((vote) => (
              <VoteResultItem voteResult={vote} showId key={vote.id} />
            ))}
        </Grid>
      </Tabs.Content>
      <Tabs.Content value="opposedBills">
        <Grid gap={2}>
          {opposedVotes &&
            opposedVotes.map((vote) => (
              <VoteResultItem voteResult={vote} showId key={vote.id} />
            ))}
        </Grid>
      </Tabs.Content>
    </Tabs.Root>
  );
};
