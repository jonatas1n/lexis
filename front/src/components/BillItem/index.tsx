import { Grid, Text, Button } from "@chakra-ui/react";
import { Bill } from "@/types";
import { VoteCounter } from "../VoteCounter";
import { useAppContext } from "@/hooks/context";

type BillItemType = {
  bill: Bill;
  showId?: boolean;
};

export const BillItem = ({ bill, showId }: BillItemType) => {
  const { setSelectedBill } = useAppContext();
  const handleClick = () => setSelectedBill(bill.id.toString());

  return (
    <Grid
      as={Button}
      onClick={handleClick}
      color="black"
      bgColor="#eee"
      p={2}
      borderRadius={8}
      alignContent="center"
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
