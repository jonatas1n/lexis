import { Card, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FaArrowLeft } from "react-icons/fa";

export const PageBoxLayout = ({ children }: PropsWithChildren) => {
  return (
    <Grid w="100vh">
      <Grid gap="1rem" templateRows="3rem calc(100vh - 6rem)">
        <GridItem alignContent="center">
          <Link href="/">
            <FaArrowLeft /> <Text fontVariant="all-small-caps">Back</Text>
          </Link>
        </GridItem>
        <Card.Root>
          <Card.Body h="100%">
            {children}
          </Card.Body>
        </Card.Root>
      </Grid>
    </Grid>
  );
};
