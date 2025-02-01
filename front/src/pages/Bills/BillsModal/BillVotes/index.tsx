import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { Grid, Tabs } from "@chakra-ui/react";
import { Bill } from "@/types";
import { useBillVotes } from "@/hooks/api/queries/bills";
import { LegislatorItem } from "@/components/LegislatorItem";

export const BillVotes = ({ bill }: { bill: Bill }) => {
  const { data: billVotes } = useBillVotes(
    bill.id?.toString()
  );
  const { noVoters, yesVoters } = billVotes ?? {};
  return (
    <Tabs.Root variant="subtle" defaultValue="yesBills">
      <Tabs.List width="100%" justifyContent="space-between">
        <Tabs.Trigger
          width="100%"
          justifyContent="center"
          value="yesBills"
        >
          <IoMdHeart />
          Support Voters
        </Tabs.Trigger>
        <Tabs.Trigger width="100%" justifyContent="center" value="noBills">
          <IoMdHeartDislike />
          Oppose Voters
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="yesBills">
        <Grid gap={2}>
          {yesVoters &&
            yesVoters.map((legislator) => (
              <LegislatorItem legislator={legislator} key={legislator.id} />
            ))}
        </Grid>
      </Tabs.Content>
      <Tabs.Content value="noBills">
        <Grid gap={2}>
          {noVoters &&
            noVoters.map((legislator) => (
              <LegislatorItem legislator={legislator} key={legislator.id} />
            ))}
        </Grid>
      </Tabs.Content>
    </Tabs.Root>
  );
};
