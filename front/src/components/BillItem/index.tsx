import { Grid, Text, Button } from "@chakra-ui/react";
import { Bill } from "@/types";
import { VoteCounter } from "../VoteCounter";

type BillItemType = {
  bill: Bill;
  showId?: boolean;
  onClick?: VoidFunction;
};

export const BillItem = ({ bill, showId, onClick }: BillItemType) => {
  return (
    <Grid
      as={Button}
      onClick={onClick}
      color="black"
      bgColor="#eee"
      p={2}
      borderRadius={8}
      justifyContent="space-between"
      templateColumns="auto 8rem"
    >
      <Grid gap={2} templateColumns="6rem auto">
        {showId && <Text fontStyle="italic">#{bill.id}</Text>}
        <Text>{bill.title}</Text>
      </Grid>
      <VoteCounter
        nayMessage="Votes against this piece of legislation."
        yeaMessage="Votes for this piece of legislation."
        nayCount={bill.opposedVotes}
        yeaCount={bill.supportVotes}
      />
    </Grid>
  );
};
