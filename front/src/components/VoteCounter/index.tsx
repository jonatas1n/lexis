import { Grid, Card, Text } from "@chakra-ui/react";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
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
    <Grid gap={1} templateColumns="repeat(2, 1fr)">
      <Tooltip content={nayMessage}>
        <Card.Root size="sm" p={0} minWidth={12}>
          <Card.Body
            p={1}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <IoMdHeartDislike />
            <Text>{nayCount}</Text>
          </Card.Body>
        </Card.Root>
      </Tooltip>
      <Card.Root size="sm" minWidth={12}>
        <Tooltip content={yeaMessage}>
          <Card.Body
            p={1}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <IoMdHeart />
            {yeaCount}
          </Card.Body>
        </Tooltip>
      </Card.Root>
    </Grid>
  );
};
