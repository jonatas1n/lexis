import { Card, Text } from "@chakra-ui/react";
import { VoteCounter, VoteCounterProps } from "../VoteCounter";

type EntityItemProps = {
  title: string;
  onClick?: VoidFunction;
  counter?: VoteCounterProps;
};

export const EntityItem = ({ onClick, title, counter: counterProps }: EntityItemProps) => {
  return (
    <Card.Root
      variant="subtle"
      onClick={onClick}
      size="sm"
      _hover={{ cursor: onClick ? "pointer" : "unset" }}
    >
      <Card.Body
        display="grid"
        gridTemplateColumns={{ lg: "auto 8rem", base: "1fr" }}
        gap={{ md: 2, base: 1 }}
        alignItems="center"
        p={1}
      >
        <Text>{title}</Text>
        {counterProps &&
          <VoteCounter
            {...counterProps}
          />
        }
      </Card.Body>
    </Card.Root>
  );
};
