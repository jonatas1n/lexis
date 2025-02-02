import { ListSection } from "@/components/ListSection";
import { BillItem } from "@/components/BillItem";
import { Bill } from "@/types";

type BillsListProps = {
  data?: Bill[];
  isError: boolean;
  isLoading: boolean;
};

const PAGE_LINK = "/bills";

export const BillsList = ({ data, isLoading, isError }: BillsListProps) => (
  <ListSection
    data={data}
    isError={isError}
    isLoading={isLoading}
    seeMorePath={PAGE_LINK}
    title="Bills"
    renderItem={(bill) => <BillItem bill={bill} key={bill.id} />}
  />
);
