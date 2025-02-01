import { Flex, Text, Badge, Avatar } from "@chakra-ui/react";
import { Bill } from "@/types";
import { FaScroll } from "react-icons/fa";

type BillProfileProps = {
  bill: Bill;
};

export const BillProfile = ({ bill }: BillProfileProps) => {
  return (
    <Flex gap={2} align="center">
      <Avatar.Root size="xl">
        <Avatar.Fallback>
          <FaScroll size={28} />
        </Avatar.Fallback>
      </Avatar.Root>
      <Flex direction="column" align="flex-start">
        <Text fontWeight="700" fontSize={20}>
          {bill.title}
        </Text>
        <Badge>#{bill.id}</Badge>
      </Flex>
    </Flex>
  );
};
