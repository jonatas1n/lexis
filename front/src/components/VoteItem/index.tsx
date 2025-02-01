import { Grid, Text, Button } from "@chakra-ui/react";
import { VotesResults } from "@/types";

type LegislatorItemType = {
  voteResult: VotesResults;
  showId?: boolean;
  onClick?: VoidFunction;
};

export const VoteResultItem = ({
  voteResult,
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
      alignContent="center"
      justifyContent="space-between"
      templateColumns="auto 8rem"
    >
      <Grid gap={2} templateColumns="6rem auto">
        {showId && <Text fontStyle="italic">#{voteResult.billId}</Text>}
        <Text>{voteResult.billTitle}</Text>
      </Grid>
    </Grid>
  );
};
