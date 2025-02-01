import { useLegislator } from "@/hooks/api/queries/legislators/legislator";
import {
  Flex,
  Grid,
  GridItem,
  Spinner,
  Separator,
  Text,
} from "@chakra-ui/react";
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
  const { selectedLegislator, clearSelected } = useAppContext();
  const { data: legislator, isLoading } = useLegislator(
    selectedLegislator ?? ""
  );
  const { yesBills, noBills } = legislator ?? {};

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
          <DialogCloseTrigger onClick={clearSelected} />
        </DialogHeader>
        {!isLoading && legislator ? (
          <DialogBody>
            <Grid gap={8}>
              <GridItem>
                <Grid gap={4}>
                  <LegislatorProfile legislator={legislator} />
                  {yesBills && noBills ? (
                    <ProgresBar
                      yesCount={yesBills ?? 0}
                      noCount={noBills ?? 0}
                    />
                  ) : null}
                </Grid>
              </GridItem>
              <Separator />
              {yesBills && noBills ? (
                <LegislatorVotes legislator={legislator} />
              ) : (
                <Text fontStyle="italic" textAlign="center">
                  This legislator did not participate in any votes
                </Text>
              )}
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
