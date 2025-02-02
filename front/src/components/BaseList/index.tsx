import { Flex, FlexProps, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.075, duration: 0.4, ease: "easeOut" },
  }),
};

type BaseListProps<T> = {
  data?: T[];
  renderItem: (item: T) => React.ReactNode;
  isLoading?: boolean;
  limit?: number;
} & FlexProps;

export const BaseList = <T,>({ data, renderItem, isLoading, limit, ...flexProps }: BaseListProps<T>) => {
  const cappedData = data?.slice(0, limit ?? data.length);
  return (
    <Flex height="100%" direction="column" gap={2} {...flexProps}>
      {cappedData && !isLoading ? (
        cappedData.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {renderItem(item)}
          </motion.div>
        ))
      ) : isLoading ? (
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
  );
};
