import { Text, Card } from "@chakra-ui/react";
import { Legislator } from "@/types";
import { VoteCounter } from "../VoteCounter";
import { useAppContext } from "@/hooks/context";

type LegislatorItemType = {
  legislator: Legislator;
};

export const LegislatorItem = ({ legislator }: LegislatorItemType) => {
  const { updateLegislator } = useAppContext();
  const handleClick = () => updateLegislator(legislator.id.toString());

  return (
    <Card.Root
      variant="subtle"
      onClick={handleClick}
      size="sm"
      _hover={{ cursor: "pointer" }}
    >
      <Card.Body
        display="grid"
        gridTemplateColumns="auto 8rem"
        gap={2}
        alignItems="center"
        p={1}
      >
        <Text>{legislator.name}</Text>
        <VoteCounter
          nayMessage="Votes against pieces of legislation."
          yeaMessage="Votes for pieces of legislation."
          nayCount={legislator.noBills}
          yeaCount={legislator.yesBills}
        />
      </Card.Body>
    </Card.Root>
  );
};
