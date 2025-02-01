import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { Grid, Tabs } from "@chakra-ui/react";
import { Bill } from "@/types";
import { useBillVotes } from "@/hooks/api/queries/bills";
import { VoteResultItem } from "@/components/VoteItem";

export const BillVotes = ({ bill }: { bill: Bill }) => {
  const { data: billVotes } = useBillVotes(
    bill.id?.toString()
  );
  const { opposedVotes, supportedVotes } = billVotes ?? {};
  return (
    <Tabs.Root variant="subtle" defaultValue="supportedBills">
      <Tabs.List width="100%" justifyContent="space-between">
        <Tabs.Trigger
          width="100%"
          justifyContent="center"
          value="supportedBills"
        >
          <IoMdHeart />
          Support Voters
        </Tabs.Trigger>
        <Tabs.Trigger width="100%" justifyContent="center" value="opposedBills">
          <IoMdHeartDislike />
          Oppose Voters
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
