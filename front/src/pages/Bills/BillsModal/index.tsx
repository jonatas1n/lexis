import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { useBill } from "@/hooks/api/queries/bills/bill";
import { Flex, Grid, GridItem, Separator, Spinner, Tabs } from "@chakra-ui/react";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { ProgresBar } from "@/components/ProgressBar";
import { useAppContext } from "@/hooks/context";
import { BillProfile } from "./BillProfile";

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
                  <BillProfile bill={bill} />
                  <ProgresBar value={supportedVotesRate} total={100} />
                </Grid>
              </GridItem>
              <Separator />
              <GridItem>
                <Tabs.Root variant="subtle" defaultValue="supportedBills">
                  <Tabs.List width="100%" justifyContent="space-between">
                    <Tabs.Trigger
                      width="100%"
                      justifyContent="center"
                      value="opposedBills"
                    >
                      <IoMdHeartDislike />
                      Oppose Votes
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      width="100%"
                      justifyContent="center"
                      value="supportedBills"
                    >
                      <IoMdHeart />
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
