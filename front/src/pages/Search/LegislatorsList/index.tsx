import { ListSection } from "@/components/ListSection";
import { Legislator } from "@/types";
import { LegislatorItem } from "@/components/LegislatorItem";

export const LegislatorsList = ({
  data,
  isLoading,
}: {
  data?: Legislator[];
  isLoading: boolean;
}) => (
  <ListSection
    data={data}
    seeMorePath="/legislators"
    isLoading={isLoading}
    title="Legislators"
    renderItem={(legislator) => (
      <LegislatorItem legislator={legislator} key={legislator.id} />
    )}
  />
);
