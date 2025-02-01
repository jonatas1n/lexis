import { Legislator } from "@/types";
import { AvatarGroup, Avatar } from "@/components/ui/avatar";
import {
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";

type LegislatorProfileProps = {
  legislator: Legislator;
}

export const LegislatorProfile = ({legislator}: LegislatorProfileProps) => {
  return (
    <Flex gap={2} align="center">
      <AvatarGroup>
        <Avatar size="xl" />
      </AvatarGroup>
      <Grid>
        <Text fontWeight="700" fontSize={20}>
          {legislator.name}
        </Text>
        <Text fontVariant="all-small-caps">#{legislator.id}</Text>
      </Grid>
    </Flex>
  )
}