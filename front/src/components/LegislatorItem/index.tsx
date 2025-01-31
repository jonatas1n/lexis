import { Grid, Text, Button } from "@chakra-ui/react";
import { Legislator } from "@/types";
import { VoteCounter } from "../VoteCounter";

type LegislatorItemType = {
  legislator: Legislator;
  showId?: boolean;
  onClick?: VoidFunction;
};

export const LegislatorItem = ({
  legislator,
  showId,
  onClick,
}: LegislatorItemType) => {
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
        {showId && <Text fontStyle="italic">#{legislator.id}</Text>}
        <Text>{legislator.name}</Text>
      </Grid>
      <VoteCounter
        nayMessage="Votes against pieces of legislation."
        yeaMessage="Votes for pieces of legislation."
        nayCount={legislator.opposedBills}
        yeaCount={legislator.supportedBills}
      />
    </Grid>
  );
};
