import { ListSection } from "@/components/ListSection";
import { Legislator } from "@/types";
import { LegislatorItem } from "@/components/LegislatorItem";

type LeglislatorListPorps = {
  data?: Legislator[];
  isLoading: boolean;
  isError: boolean;
};

export const LegislatorsList = ({ data, isLoading, isError }: LeglislatorListPorps) => (
  <ListSection
    data={data}
    seeMorePath="/legislators"
    isError={isError}
    isLoading={isLoading}
    title="Legislators"
    renderItem={(legislator) => (
      <LegislatorItem legislator={legislator} key={legislator.id} />
    )}
  />
);
