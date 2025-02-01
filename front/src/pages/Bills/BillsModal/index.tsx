import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { useBill } from "@/hooks/api/queries/bills/bill";
import { AvatarGroup, Avatar } from "@/components/ui/avatar";
import { Flex, Grid, GridItem, Spinner, Text, Tabs } from "@chakra-ui/react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaVoteYea } from "react-icons/fa";
import { ProgresBar } from "@/components/ProgressBar";
import { useAppContext } from "@/hooks/context";

export const BillsModal = () => {
  const { selectedBill, clearSelectedBill } = useAppContext();
  const { data: bill, isLoading } = useBill(selectedBill ?? "");
  const supportedVotesRate = bill
    ? (bill.supportVotes / (bill.opposedVotes + bill.supportVotes)) * 100
    : null;

  return (
    <DialogRoot
      size="xl"
      placement="center"
      motionPreset="slide-in-bottom"
      open={!!selectedBill}
      closeOnInteractOutside
    >
      <DialogContent>
        <DialogHeader>
          <DialogCloseTrigger onClick={clearSelectedBill} />
        </DialogHeader>
        {!isLoading && bill ? (
          <DialogBody>
            <Grid gap={8}>
              <GridItem>
                <Grid gap={4}>
                  <Flex gap={2} align="center">
                    <AvatarGroup>
                      <Avatar icon={<FaVoteYea />} size="xl" />
                    </AvatarGroup>
                    <Grid>
                      <Text fontWeight="700" fontSize={20}>
                        {bill.title}
                      </Text>
                      <Text fontVariant="all-small-caps">#{bill.id}</Text>
                    </Grid>
                  </Flex>
                  <GridItem>
                    <ProgresBar value={supportedVotesRate} total={100} />
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
