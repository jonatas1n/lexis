import { useLegislator } from "@/hooks/api/queries/legislators/legislator";
import { Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";

import { LegislatorProfile } from "./LegislatorProfile";
import { LegislatorVotes } from "./LegislatorVotes";
import { ProgresBar } from "@/components/ProgressBar";
import { useAppContext } from "@/hooks/context";

export const LegislatorsModal = () => {
  const { selectedLegislator, clearSelectedLegislator } = useAppContext();
  const { data: legislator, isLoading } = useLegislator(
    selectedLegislator ?? ""
  );
  const supportedVotesRate = legislator
    ? (legislator.supportedBills /
        (legislator.opposedBills + legislator.supportedBills)) *
      100
    : null;

  return (
    <DialogRoot
      size="xl"
      placement="center"
      motionPreset="slide-in-bottom"
      open={!!selectedLegislator}
      closeOnInteractOutside
    >
      <DialogContent>
        <DialogHeader>
          <DialogCloseTrigger onClick={clearSelectedLegislator} />
        </DialogHeader>
        {!isLoading && legislator ? (
          <DialogBody>
            <Grid gap={8}>
              <GridItem>
                <Grid gap={4}>
                  <LegislatorProfile legislator={legislator} />
                  <ProgresBar value={supportedVotesRate} total={100} />
                </Grid>
              </GridItem>
              <GridItem>
                <LegislatorVotes legislator={legislator} />
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
