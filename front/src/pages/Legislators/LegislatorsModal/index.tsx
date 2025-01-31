import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { useLegislator } from "@/hooks/api/queries/legislators/legislator";
import { AvatarGroup, Avatar } from "@/components/ui/avatar";
import {
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  Tabs,
  Progress,
} from "@chakra-ui/react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

type LegislatorsModalProps = {
  onClose: VoidFunction;
  legislatorId?: string;
};

export const LegislatorsModal = ({
  onClose,
  legislatorId,
}: LegislatorsModalProps) => {
  const { data: legislator, isLoading } = useLegislator(legislatorId ?? "");
  const supportedVotesRate = legislator ? legislator.supportedBills / (legislator.opposedBills + legislator.supportedBills) * 100 : null;

  return (
    <DialogRoot
      size="xl"
      placement="center"
      motionPreset="slide-in-bottom"
      open={!!legislatorId}
      closeOnInteractOutside
    >
      <DialogContent>
        <DialogHeader>
          <DialogCloseTrigger onClick={onClose} />
        </DialogHeader>
        {!isLoading && legislator ? (
          <DialogBody>
            <Grid gap={8}>
              <GridItem>
                <Grid gap={4}>
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
                  <GridItem>
                    <Progress.Root value={supportedVotesRate ?? null} max={100} size="lg">
                      <Progress.Track>
                        <Progress.Range />
                      </Progress.Track>
                      <Progress.Label />
                      <Progress.ValueText />
                    </Progress.Root>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                <Tabs.Root variant="subtle" defaultValue="supportedBills">
                  <Tabs.List width="100%" justifyContent="space-between">
                    <Tabs.Trigger
                      width="100%"
                      justifyContent="center"
                      value="opposedBills"
                    >
                      <AiFillDislike />
                      Oppose Votes
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      width="100%"
                      justifyContent="center"
                      value="supportedBills"
                    >
                      <AiFillLike />
                      Support Votes
                    </Tabs.Trigger>
                    <Tabs.Indicator />
                  </Tabs.List>
                  <Tabs.Content value="supportedBills">
                    Support Votes
                  </Tabs.Content>
                  <Tabs.Content value="opposedBills">Oppose Votes</Tabs.Content>
                </Tabs.Root>
              </GridItem>
            </Grid>
          </DialogBody>
        ) : (
          <Flex>
            <Spinner />
          </Flex>
        )}
      </DialogContent>
    </DialogRoot>
  );
};
