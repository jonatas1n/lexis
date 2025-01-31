import { Bill, StringOrNumber } from "@/types"

export type Legislator = {
  id: StringOrNumber;
  name: string;
  supportedBills: number;
  opposedBills: number;
};

export type LegislatorBillsList = {
  supportedBillsList: Bill[];
  opposedBills: Bill[]
};

export type LegislatorResponse = {
  id: StringOrNumber;
  name: string;
  supported_bills: number;
  opposed_bills: number;
};