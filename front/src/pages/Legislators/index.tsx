import { useMemo, useCallback, ChangeEvent, useState } from "react";
import { Flex, Text, Grid, Spinner } from "@chakra-ui/react";
import { PageBoxLayout } from "@/components/PageBoxLayout";
import { SearchInput } from "@/components/SearchInput";
import { useQueryParam } from "@/hooks/api/queries/query";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "react-use";
import { useLegislators } from "@/hooks/api/queries/legislators";
import { LegislatorItem } from "@/components/LegislatorItem";

import { LegislatorsModal } from "./LegislatorsModal";
import { Legislator } from "@/types";

const PAGE_TITLE = "Legislators";
const SEARCH_QUERY_PARAM = "name";
const SELECTED_LEGISLATOR_QUERY_PARAM = "selected";
const DEBOUNCE_PERIOD = 300;

type UpdateQueryProps = Partial<{
  [SEARCH_QUERY_PARAM]: string;
  [SELECTED_LEGISLATOR_QUERY_PARAM]: string;
}>;

export const LegislatorsPage = () => {
  const query = useQueryParam();
  const navigate = useNavigate();
  const querySearchTerm = useMemo(
    () => query.get(SEARCH_QUERY_PARAM) ?? "",
    [query]
  );

  const selectedLegislator =
    query.get(SELECTED_LEGISLATOR_QUERY_PARAM) ?? undefined;
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

  const { data: legislators, isLoading } = useLegislators(queryParams);

  const selectLegislator = (legislator: Legislator["id"]) =>
    updateQuery({
      ...query,
      [SELECTED_LEGISLATOR_QUERY_PARAM]: legislator.toString(),
    });
  const clearSelected = () =>
    updateQuery({ ...query, [SELECTED_LEGISLATOR_QUERY_PARAM]: "" });

  return (
    <PageBoxLayout>
      <LegislatorsModal
        legislatorId={selectedLegislator}
        onClose={clearSelected}
      />
      <Grid alignContent="flex-start" gap={4} h="100%">
        <Flex align="center" justify="space-between" px={2}>
          <Text fontWeight="800" fontSize={24}>
            {PAGE_TITLE}
          </Text>
          <Flex>
            <SearchInput
              placeholder="Search for Legislators names"
              py={0}
              value={searchTerm}
              onChange={handleSearchChange}
              onClear={clearTerm}
            />
          </Flex>
        </Flex>
        <Grid gap={2} px={2} alignContent="flex-start" overflowY="auto">
          {!isLoading && legislators ? (
            legislators.map((legislator) => (
              <LegislatorItem
                onClick={() => selectLegislator(legislator.id.toString())}
                showId
                legislator={legislator}
                key={legislator.id}
              />
            ))
          ) : (
            <Flex justify="center" align="center">
              <Spinner />
            </Flex>
          )}
        </Grid>
      </Grid>
    </PageBoxLayout>
  );
};
