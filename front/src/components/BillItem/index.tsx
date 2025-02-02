import { Bill } from "@/types";
import { useAppContext } from "@/hooks/context";
import { EntityItem } from "../EntityItem";

type BillItemType = {
  bill: Bill;
};

export const BillItem = ({ bill }: BillItemType) => {
  const { updateBill } = useAppContext();
  const handleClick = () => updateBill(bill.id.toString());
  const voteCouterProps = {
    nayMessage: "Votes against this piece of legislation.",
    nayCount: bill.noVotes,
    yeaMessage: "Votes for this piece of legislation.",
    yeaCount: bill.yesVotes,
  };

  return (
    <EntityItem title={bill.title} onClick={handleClick} {...voteCouterProps} />
  );
};
