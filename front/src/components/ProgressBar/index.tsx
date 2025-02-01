import { Progress, Flex, Text } from "@chakra-ui/react";

type ProgressBarProps = {
  yesCount: number;
  noCount: number;
};

export const ProgresBar = ({ yesCount, noCount }: ProgressBarProps) => {
  const total = yesCount + noCount;
  const yesPercentage = total ? (yesCount / total) * 100 : 0;
  const noPercentage = total ? 100 - yesPercentage : 0;
  return (
    <Progress.Root value={yesPercentage} max={100} size="lg">
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
      <Flex justify="space-between" mt={1}>
        <Progress.Label>
          {yesPercentage && <Text>{yesPercentage.toFixed(2)}% Yes votes</Text>}
        </Progress.Label>
        <Progress.Label>
          {noPercentage && <Text>{(noPercentage).toFixed(2)}% No votes</Text>}
        </Progress.Label>
      </Flex>
    </Progress.Root>
  );
};
