import { Card, Flex, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Logo } from "../Logo";

type PageBoxLayoutProps = PropsWithChildren<{
  goto?: {
    link: string;
    label: string;
  };
}>;

export const PageBoxLayout = ({ children, goto }: PageBoxLayoutProps) => {
  return (
    <Grid h="100vh">
      <Grid gap="1rem" templateRows="3rem calc(100vh - 6rem)">
        <GridItem alignContent="center">
          <Flex w="100%" justify="space-between" alignItems="center">
            <Link href="/" justifySelf="start">
              <Logo size={36} justifySelf="center" />
            </Link>
            {goto && (
              <Link
                href={goto.link}
                justifySelf="end"
                textDecoration="underline"
              >
                <Text textTransform="uppercase" fontWeight="600">
                  {goto.label}
                </Text>
              </Link>
            )}
          </Flex>
        </GridItem>
        <Card.Root>
          <Card.Body h="100%">{children}</Card.Body>
        </Card.Root>
      </Grid>
    </Grid>
  );
};
