import { ListSection } from "@/components/ListSection";
import { BillItem } from "@/components/BillItem";
import { Bill } from "@/types";

type BillsListProps = {
  data?: Bill[];
  isLoading: boolean;
};

const PAGE_LINK = "/bills";

export const BillsList = ({ data, isLoading }: BillsListProps) => (
  <ListSection
    data={data}
    isLoading={isLoading}
    seeMorePath={PAGE_LINK}
    title="Bills"
    renderItem={(bill) => <BillItem bill={bill} key={bill.id} />}
  />
);
