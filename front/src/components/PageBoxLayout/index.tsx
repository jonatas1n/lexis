import { Card, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Logo } from "../Logo";

export const PageBoxLayout = ({ children }: PropsWithChildren) => {
  return (
    <Grid h="100vh">
      <Grid gap="1rem" templateRows="3rem calc(100vh - 6rem)">
        <GridItem alignContent="center">
          <Grid w="100%" templateColumns="1fr auto 1fr" alignItems="center">
            <Link href="/" justifySelf="start">
              <FaArrowLeft /> <Text fontVariant="all-small-caps">Back</Text>
            </Link>
            <Logo size={36} justifySelf="center" />
          </Grid>
        </GridItem>
        <Card.Root>
          <Card.Body h="100%">{children}</Card.Body>
        </Card.Root>
      </Grid>
    </Grid>
  );
};
