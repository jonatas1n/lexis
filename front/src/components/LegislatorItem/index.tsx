import { Grid, Text, Button } from "@chakra-ui/react";
import { Legislator } from "@/types";
import { VoteCounter } from "../VoteCounter";
import { useAppContext } from "@/hooks/context";

type LegislatorItemType = {
  legislator: Legislator;
  showId?: boolean;
};

export const LegislatorItem = ({
  legislator,
  showId,
}: LegislatorItemType) => {
  const { setSelectedLegislator } = useAppContext();
  const handleClick = () => setSelectedLegislator(legislator.id.toString());

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
