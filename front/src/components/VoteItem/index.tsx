import { Grid, Text, Button } from "@chakra-ui/react";
import { VotesResults } from "@/types";

type VoteResultItemType = {
  voteResult: VotesResults;
};

export const VoteResultItem = ({ voteResult }: VoteResultItemType) => {
  return (
    <Grid
      as={Button}
      color="black"
      bgColor="#eee"
      p={2}
      borderRadius={8}
      alignContent="center"
      justifyContent="space-between"
      templateColumns="auto 8rem"
    >
      <Grid gap={2} templateColumns="6rem auto">
        <Text fontStyle="italic">#{voteResult.billId}</Text>
        <Text>{voteResult.billTitle}</Text>
      </Grid>
    </Grid>
  );
};
