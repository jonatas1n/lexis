import { Flex, Text, Badge, Avatar, Link } from "@chakra-ui/react";
import { Bill } from "@/types";
import { FaScroll } from "react-icons/fa";
import { useAppContext } from "@/hooks/context";

type BillProfileProps = {
  bill: Bill;
};

export const BillProfile = ({ bill }: BillProfileProps) => {
  const { updateLegislator } = useAppContext();
  const openSponsorPage = () => updateLegislator(bill.sponsorId.toString());
  return (
    <Flex gap={2} align="center">
      <Avatar.Root size="xl">
        <Avatar.Fallback>
          <FaScroll size={28} />
        </Avatar.Fallback>
      </Avatar.Root>
      <Flex direction="column" gap={2}>
        <Flex direction="column" align="flex-start">
          <Badge>#{bill.id}</Badge>
          <Text fontWeight="700" fontSize={20}>
            {bill.title}
          </Text>
        </Flex>
        {bill.sponsorName && (
          <Flex gap={1}>
            <Text>Primary Sponsor:</Text>
            <Link
              onClick={openSponsorPage}
              fontWeight="600"
              textDecoration="underline"
            >
              {bill.sponsorName}
            </Link>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
