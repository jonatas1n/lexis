import { useMemo, useCallback, ChangeEvent, useState } from "react";
import { Flex, Text, Grid } from "@chakra-ui/react";
import { PageBoxLayout } from "@/components/PageBoxLayout";
import { SearchInput } from "@/components/SearchInput";
import { useQueryParam } from "@/hooks/api/queries/query";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "react-use";
import { useLegislators } from "@/hooks/api/queries/legislators";
import { LegislatorItem } from "@/components/LegislatorItem";
import { BaseList } from "@/components/BaseList";

import { mergeURLSearchParams } from "@/utils/uri";

const PAGE_TITLE = "Legislators";
const SEARCH_QUERY_PARAM = "name";
const DEBOUNCE_PERIOD = 300;

type UpdateQueryProps = Partial<{
  [SEARCH_QUERY_PARAM]: string;
}>;

export const LegislatorsPage = () => {
  const query = useQueryParam();
  const navigate = useNavigate();

  const querySearchTerm = useMemo(
    () => query.get(SEARCH_QUERY_PARAM) ?? "",
    [query]
  );

  const [searchTerm, setSearchTerm] = useState(querySearchTerm);
  const updateQuery = useCallback(
    (props: UpdateQueryProps) => {
      const newSearch = mergeURLSearchParams(query, { ...props }).toString();
      navigate({ ...location, search: newSearch }, { replace: true });
    },
    [query, navigate]
  );

  useDebounce(
    () => {
      updateQuery({
        [SEARCH_QUERY_PARAM]: searchTerm,
      });
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

  return (
    <PageBoxLayout goto={{ link: "/bills", label: "Bills" }}>
      <Grid alignContent="flex-start" gap={4} h="100%">
        <Flex
          align="stretch"
          justify="space-between"
          direction={{ lg: "row", base: "column" }}
          mb={4}
          gap={4}
        >
          <Text textAlign="center" fontWeight="800" fontSize={24}>
            {PAGE_TITLE}
          </Text>
          <SearchInput
            placeholder="Search for Legislators names"
            py={0}
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={clearTerm}
          />
        </Flex>
        <BaseList
          data={legislators}
          renderItem={(legislator) => (
            <LegislatorItem legislator={legislator} key={legislator.id} />
          )}
          isLoading={isLoading}
        />
      </Grid>
    </PageBoxLayout>
  );
};
