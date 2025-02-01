import { apiClient } from ".";
import { GenericAbortSignal } from "axios";
import { BillResponse } from "../types";

type GetBillsParamType = {
  title?: string;
  sponsorId?: string;
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
    id: parseInt(bill.id),
    title: bill.title,
    sponsorId: parseInt(bill.sponsorId),
    opposedVotes: bill.opposed_votes,
    supportVotes: bill.support_votes,
  }));
};

export const getBill = async (id: string, signal?: GenericAbortSignal) => {
  const { data } = await apiClient.get<BillResponse>(`/bills/${id}`, {
    signal,
  });

  return {
    id: parseInt(data.id),
    title: data.title,
    sponsorId: parseInt(data.sponsorId),
    opposedVotes: data.opposed_votes,
    supportVotes: data.support_votes,
  };
};
