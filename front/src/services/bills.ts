import { apiClient } from ".";
import { GenericAbortSignal } from "axios";
import { BillResponse, BillVotesListResponse, LegislatorResponse } from "../types";

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
    sponsorId: parseInt(bill.sponsor_id),
    noVotes: bill.no_votes,
    yesVotes: bill.yes_votes,
  }));
};

export const getBill = async (id: string, signal?: GenericAbortSignal) => {
  const { data } = await apiClient.get<BillResponse>(`/bills/${id}`, {
    signal,
  });

  return {
    id: parseInt(data.id),
    title: data.title,
    sponsorId: parseInt(data.sponsor_id),
    noVotes: data.no_votes,
    yesVotes: data.yes_votes,
  };
};

export const getBillVotes = async (id: string, signal?: GenericAbortSignal) => {
  const { data } = await apiClient.get<BillVotesListResponse>(
    `/bills/${id}/votes`,
    { signal }
  );
  if (!data) return { supportVoters: [], opposeVoters: []}

  const mapVotes = (votes: LegislatorResponse[]) =>
    votes.map(({ id, name, yes_bills, no_bills  }) => ({
      name,
      id: parseInt(id),
      yesBills: parseInt(yes_bills),
      noBills: parseInt(no_bills),
    }));
  
  return {
    supportVoters: mapVotes(data.yes_voters),
    opposeVoters: mapVotes(data.no_voters),
  }
}
