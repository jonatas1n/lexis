import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { useBills } from "@/hooks/api/queries/bills/list-bills";
import { useState, useMemo, useCallback, ChangeEvent } from "react";
import { useQueryParam } from "@/hooks/api/queries/query";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/SearchInput";
import { useDebounce } from "react-use";

import { BillItem } from "@/components/BillItem";
import { PageBoxLayout } from "@/components/PageBoxLayout";
import { Bill } from "@/types";
import { BillsModal } from "./BillsModal";

const PAGE_TITLE = "Bills";
const SEARCH_QUERY_PARAM = "title";
const DEBOUNCE_PERIOD = 300;
const SELECTED_BILL_QUERY_PARAM = "selected";

type UpdateQueryProps = Partial<{
  [SEARCH_QUERY_PARAM]: string;
  [SELECTED_BILL_QUERY_PARAM]: string;
}>;

export const BillsPage = () => {
  const query = useQueryParam();
  const navigate = useNavigate();

  const querySearchTerm = useMemo(
    () => query.get(SEARCH_QUERY_PARAM) ?? "",
    [query]
  );
  const selectedBill =
    query.get(SELECTED_BILL_QUERY_PARAM) ?? undefined;
  const [searchTerm, setSearchTerm] = useState(querySearchTerm);

  const updateQuery = useCallback(
    (props: UpdateQueryProps) => {
      const newSearch = new URLSearchParams({ ...query, ...props }).toString();
      navigate({ ...location, search: newSearch }, { replace: true });
    },
    [query, navigate]
  );

  useDebounce(
    () => {
      updateQuery({ [SEARCH_QUERY_PARAM]: searchTerm });
    },
    DEBOUNCE_PERIOD,
    [searchTerm]
  );

  const queryParams = useMemo(
    () => ({
      [SEARCH_QUERY_PARAM]: querySearchTerm,
    }),
    [querySearchTerm]
  );

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const clearTerm = () => setSearchTerm("");

  const selectBill = (legislator: Bill["id"]) =>
      updateQuery({
        ...query,
        [SELECTED_BILL_QUERY_PARAM]: legislator.toString(),
      });

  const { data: bills, isLoading } = useBills(queryParams);

  return (
    <PageBoxLayout>
      <BillsModal
        billId={selectedBill}
        onClose={clearTerm}
      />
      <Flex align="center" justify="space-between" mb={4} gap={4}>
        <Text fontWeight="800" fontSize={24}>
          {PAGE_TITLE}
        </Text>
        <Flex>
          <SearchInput
            placeholder="Search for Bills titles"
            py={0}
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={clearTerm}
          />
        </Flex>
      </Flex>
      <Grid gap={2} alignContent="flex-start" h="100%" overflowY="auto">
        {!isLoading ? (
          bills?.map((bill) => <BillItem onClick={() => selectBill(bill.id.toString())} showId bill={bill} key={bill.id} />)
        ) : (
          <Flex justify="center" align="center">
            <Spinner />
          </Flex>
        )}
      </Grid>
    </PageBoxLayout>
  );
};
