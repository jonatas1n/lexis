import { Legislator } from "@/types";
import { useAppContext } from "@/hooks/context";
import { EntityItem } from "../EntityItem";

type LegislatorItemType = {
  legislator: Legislator;
};

export const LegislatorItem = ({ legislator }: LegislatorItemType) => {
  const { updateLegislator } = useAppContext();
  const handleClick = () => updateLegislator(legislator.id.toString());
  const voteCouterProps = {
    nayMessage: "Votes against pieces of legislation.",
    nayCount: legislator.noBills,
    yeaMessage: "Votes for pieces of legislation.",
    yeaCount: legislator.yesBills,
  };

  return (
    <EntityItem title={legislator.name} onClick={handleClick} {...voteCouterProps} />
  );
};
