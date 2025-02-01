import { useLegislator } from "@/hooks/api/queries/legislators/legislator";
import { Flex, Grid, GridItem, Spinner, Separator } from "@chakra-ui/react";
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
  const {yesBills, noBills} = legislator ?? {};

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
                  <ProgresBar yesCount={yesBills} noCount={noBills} />
                </Grid>
              </GridItem>
              <Separator />
              <LegislatorVotes legislator={legislator} />
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
