import { Flex, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FaArrowLeft } from "react-icons/fa";

export const PageBoxLayout = ({ children }: PropsWithChildren) => {
  return (
    <Grid w="100vh">
      <Grid gap="1rem" templateRows="3rem calc(100vh - 6rem)">
        <GridItem alignContent="center">
          <Link as={GridItem} href="/">
            <FaArrowLeft /> <Text fontVariant="all-small-caps">Back</Text>
          </Link>
        </GridItem>
        <Flex
          direction="column"
          border="1px solid #ccc"
          borderRadius={8}
          overflow="hidden"
          h="100%"
          p={4}
          flex="1"
        >
          {children}
        </Flex>
      </Grid>
    </Grid>
  );
};
