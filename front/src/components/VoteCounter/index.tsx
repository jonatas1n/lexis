import { Grid, Flex } from "@chakra-ui/react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { Tooltip } from "@/components/ui/tooltip";

type VoteCounterProps = {
  yeaCount?: number;
  yeaMessage: string;
  nayCount?: number;
  nayMessage: string;
};

export const VoteCounter = ({
  yeaCount = 0,
  nayCount = 0,
  yeaMessage,
  nayMessage,
}: VoteCounterProps) => {
  return (
    <Grid gap={2} templateColumns="repeat(2, 1fr)">
      <Tooltip content={nayMessage}>
        <Flex
          align="center"
          justify="space-between"
          bgColor="black"
          color="white"
          p={1}
          borderRadius={4}
          gap={1}
        >
          <AiFillDislike />
          {nayCount}
        </Flex>
      </Tooltip>
      <Tooltip content={yeaMessage}>
        <Flex
          align="center"
          justify="space-between"
          bgColor="black"
          color="white"
          p={1}
          borderRadius={4}
          gap={1}
        >
          <AiFillLike />
          {yeaCount}
        </Flex>
      </Tooltip>
    </Grid>
  );
};
