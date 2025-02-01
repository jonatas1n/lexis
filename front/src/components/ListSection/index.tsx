import { Card, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

type ListSectionProps<T> = {
  data?: T[];
  isLoading: boolean;
  title: string;
  seeMorePath: string;
  renderItem: (item: T) => React.ReactNode;
};

const TIMEOUT_PERIOD = 500;
const ITEMS_LIMIT = 10;

export const ListSection = <T,>({
  data,
  isLoading,
  title,
  renderItem,
  seeMorePath,
}: ListSectionProps<T>) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const cappedData = data?.slice(0, ITEMS_LIMIT);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timer = setTimeout(() => setShowSpinner(true), TIMEOUT_PERIOD);
    } else {
      setShowSpinner(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <Card.Root>
      <Card.Body>
        <Flex justify="space-between" mb={4}>
          <Text fontWeight="800" fontSize={20}>
            {title}
          </Text>
          <Link href={seeMorePath} textDecoration="underline">
            See more
          </Link>
        </Flex>
        <Flex height="100%" direction="column" gap={2}>
          {cappedData && !isLoading ? (
            cappedData.map(renderItem)
          ) : showSpinner ? (
            <Flex align="center" justify="center" height="100%">
              <Spinner />
            </Flex>
          ) : null}
          {!isLoading && data?.length === 0 && (
            <Flex justify="center" mb={2}>
              <Text fontStyle="italic">No results found</Text>
            </Flex>
          )}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
