import { Card, Flex, Link, Text } from "@chakra-ui/react";
import { BaseList } from "../BaseList";

type ListSectionProps<T> = {
  data?: T[];
  isLoading: boolean;
  isError: boolean;
  title: string;
  seeMorePath: string;
  renderItem: (item: T) => React.ReactNode;
};

const ITEMS_LIMIT = 10;

export const ListSection = <T,>({
  data,
  isLoading,
  isError,
  title,
  renderItem,
  seeMorePath,
}: ListSectionProps<T>) => {
  return (
    <Card.Root>
      <Card.Body p={{ md: "1.5rem", base: 4 }}>
        <Flex justify="space-between" mb={4}>
          <Text fontWeight="800" fontSize={20}>
            {title}
          </Text>
          <Link href={seeMorePath} textDecoration="underline">
            See more
          </Link>
        </Flex>
        <BaseList
          isError={isError}
          data={data}
          isLoading={isLoading}
          limit={ITEMS_LIMIT}
          renderItem={renderItem}
        />
      </Card.Body>
    </Card.Root>
  );
};
