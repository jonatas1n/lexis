import { Card, Text } from "@chakra-ui/react";
import { Bill } from "@/types";
import { VoteCounter } from "../VoteCounter";
import { useAppContext } from "@/hooks/context";

type BillItemType = {
  bill: Bill;
};

export const BillItem = ({ bill }: BillItemType) => {
  const { setSelectedBill } = useAppContext();
  const handleClick = () => setSelectedBill(bill.id.toString());

  return (
    <Card.Root variant="subtle" onClick={handleClick} size="sm" _hover={{cursor: "pointer"}}>
      <Card.Body
        display="grid"
        gridTemplateColumns="auto 8rem"
        gap={2}
        alignItems="center"
        p={1}
      >
        <Text>{bill.title}</Text>
        <VoteCounter
          nayMessage="Votes against this piece of legislation."
          yeaMessage="Votes for this piece of legislation."
          nayCount={bill.noVotes}
          yeaCount={bill.yesVotes}
        />
      </Card.Body>
    </Card.Root>
  );
};
