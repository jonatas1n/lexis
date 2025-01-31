import { apiClient } from ".";
import { GenericAbortSignal } from "axios";
import { StringOrNumber, BillResponse } from "../types";

type GetBillsParamType = {
  title?: string;
  sponsorId?: StringOrNumber;
};

export const listBills = async (
  { title, sponsorId: sponsorId }: GetBillsParamType,
  signal?: GenericAbortSignal
) => {
  const { data } = await apiClient.get<BillResponse[]>("/bills", {
    params: {
      ...(title && { title }),
      ...(sponsorId && { sponsor_id: sponsorId }),
    },
    signal,
  });

  return data.map((bill) => ({
    ...bill,
    opposedVotes: bill.opposed_votes,
    supportVotes: bill.support_votes,
  }));
};

export const getBill = async (id: string, signal?: GenericAbortSignal) => {
  const { data } = await apiClient.get<BillResponse>(`/bills/${id}`, {
    signal,
  });

  return {
    ...data,
    opposedVotes: data.opposed_votes,
    supportVotes: data.support_votes,
  };
};
