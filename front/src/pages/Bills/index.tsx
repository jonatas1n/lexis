import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { useBills } from "@/hooks/api/queries/bills/list-bills";
import { useState, useMemo, useCallback, ChangeEvent } from "react";
import { useQueryParam } from "@/hooks/api/queries/query";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/SearchInput";
import { useDebounce } from "react-use";

import { BillItem } from "@/components/BillItem";
import { PageBoxLayout } from "@/components/PageBoxLayout";

const PAGE_TITLE = "Bills";
const SEARCH_QUERY_PARAM = "title";
const DEBOUNCE_PERIOD = 300;

type UpdateQueryProps = Partial<{
  [SEARCH_QUERY_PARAM]: string;
}>;

export const BillsPage = () => {
  const query = useQueryParam();
  const navigate = useNavigate();

  const querySearchTerm = useMemo(
    () => query.get(SEARCH_QUERY_PARAM) ?? "",
    [query]
  );
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

  const { data: bills, isLoading } = useBills(queryParams);

  return (
    <PageBoxLayout>
      <Flex
        align="center"
        justify="space-between"
        direction={{ lg: "row", base: "column" }}
        mb={4}
        gap={4}
      >
        <Text fontWeight="800" fontSize={24}>
          {PAGE_TITLE}
        </Text>
        <SearchInput
          placeholder="Search for Bills titles"
          py={0}
          value={searchTerm}
          onChange={handleSearchChange}
          onClear={clearTerm}
        />
      </Flex>
      <Grid gap={2} alignContent="flex-start" h="100%" overflowY="auto">
        {!isLoading ? (
          bills?.map((bill) => <BillItem bill={bill} key={bill.id} />)
        ) : (
          <Flex justify="center" align="center">
            <Spinner />
          </Flex>
        )}
      </Grid>
    </PageBoxLayout>
  );
};
