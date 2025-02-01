import { Link, Flex, FlexProps } from "@chakra-ui/react";

const APP_NAME = "lexis";

type LogoProps = {
  size?: number;
} & FlexProps;

export const Logo = ({size=72, ...flexProps}: LogoProps) => {
  return (
    <Flex {...flexProps}>
      <Link
        href="/"
        fontFamily="Outfit Variable"
        fontWeight="700"
        textAlign="center"
        fontSize={size}
      >
        {APP_NAME}
      </Link>
    </Flex>
  );
};
