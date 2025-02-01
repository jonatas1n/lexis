import { Progress, Flex, Text } from "@chakra-ui/react";

type ProgressBarProps = {
  value?: number | null;
  total: number;
};

export const ProgresBar = ({ value = null, total }: ProgressBarProps) => {
  return (
    <Progress.Root value={value ?? null} max={total} size="lg">
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
      <Flex justify="space-between" mt={1}>
        <Progress.Label>
          {value && <Text>{value.toFixed(2)}% Yes votes</Text>}
        </Progress.Label>
        <Progress.Label>
          {value && <Text>{(total - value).toFixed(2)}% No votes</Text>}
        </Progress.Label>
      </Flex>
    </Progress.Root>
  );
};
