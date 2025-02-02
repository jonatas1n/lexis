import { Card, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Logo } from "../Logo";

type PageBoxLayoutProps = PropsWithChildren<{
  goto?: {
    link: string;
    label: string;
  }
}>

export const PageBoxLayout = ({ children, goto }: PageBoxLayoutProps) => {
  return (
    <Grid h="100vh">
      <Grid gap="1rem" templateRows="3rem calc(100vh - 6rem)">
        <GridItem alignContent="center">
          <Grid w="100%" templateColumns="1fr auto 1fr" alignItems="center">
            <Link href="/" justifySelf="start">
              <FaArrowLeft /> <Text fontVariant="all-small-caps">Back</Text>
            </Link>
            <Logo size={36} justifySelf="center" />
            {goto && <Link href={goto.link} justifySelf="end">
              <Text fontVariant="all-small-caps">{goto.label}</Text> <FaArrowRight />
            </Link>}
          </Grid>
        </GridItem>
        <Card.Root>
          <Card.Body h="100%">{children}</Card.Body>
        </Card.Root>
      </Grid>
    </Grid>
  );
};
