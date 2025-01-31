import { apiClient } from ".";
import { GenericAbortSignal } from "axios";
import { LegislatorBillsList, LegislatorResponse } from "../types";

type GetLegislatorParamType = {
  name: string;
};

export const listLegislators = async (
  { name }: GetLegislatorParamType,
  signal?: GenericAbortSignal
) => {
  const { data } = await apiClient.get<LegislatorResponse[]>("/legislators", {
    params: { ...(name && { name }) },
    signal,
  });

  return data.map((legislator) => ({
    ...legislator,
    opposedBills: legislator.opposed_bills,
    supportedBills: legislator.supported_bills,
  }));
};

export const getLegislator = async (
  id: string,
  signal?: GenericAbortSignal
) => {
  const { data } = await apiClient.get<LegislatorResponse>(
    `/legislators/${id}`,
    { signal }
  );

  return {
    ...data,
    opposedBills: data.opposed_bills,
    supportedBills: data.supported_bills,
  };
};

export const getLegislatorBills = async (
  id: string,
  signal?: GenericAbortSignal
) => {
  const { data } = await apiClient.get<LegislatorBillsList>(
    `/legislators/${id}/bills`,
    { signal }
  );
  return data;
};
