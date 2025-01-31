import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { useBill } from "@/hooks/api/queries/bills/bill";
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



type BillsModalProps = {
  onClose: VoidFunction;
  billId?: string;
}

export const BillsModal = ({billId, onClose}: BillsModalProps) => {
  const { data: bill, isLoading } = useBill(billId ?? "");
  const supportedVotesRate = bill ? bill.supportVotes / (bill.opposedVotes + bill.supportVotes) * 100 : null;

  return (
    <DialogRoot
          size="xl"
          placement="center"
          motionPreset="slide-in-bottom"
          open={!!billId}
          closeOnInteractOutside
        >
          <DialogContent>
            <DialogHeader>
              <DialogCloseTrigger onClick={onClose} />
            </DialogHeader>
            {!isLoading && bill ? (
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
                            {bill.title}
                          </Text>
                          <Text fontVariant="all-small-caps">#{bill.id}</Text>
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
  )
}