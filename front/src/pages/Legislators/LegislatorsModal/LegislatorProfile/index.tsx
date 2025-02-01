import { Legislator } from "@/types";
import { Badge, Flex, Text, Avatar } from "@chakra-ui/react";
import { FaUserTie } from "react-icons/fa";

type LegislatorProfileProps = {
  legislator: Legislator;
};

export const LegislatorProfile = ({ legislator }: LegislatorProfileProps) => {
  return (
    <Flex gap={2} align="center">
      <Avatar.Root size="xl">
              <Avatar.Fallback>
                <FaUserTie size={28} />
              </Avatar.Fallback>
            </Avatar.Root>
      <Flex direction="column" align="flex-start">
        <Badge>#{legislator.id}</Badge>
        <Text fontWeight="700" fontSize={20}>
          {legislator.name}
        </Text>
      </Flex>
    </Flex>
  );
};
