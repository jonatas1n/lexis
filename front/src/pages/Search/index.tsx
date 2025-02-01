import { useState, ChangeEvent, useCallback, useMemo } from "react";
import { Flex, Grid } from "@chakra-ui/react";
import { useBills } from "@/hooks/api/queries/bills/list-bills";
import { useLegislators } from "@/hooks/api/queries/legislators/list-legislators";
import { useQueryParam } from "@/hooks/api/queries/query";
import { LegislatorsList } from "./LegislatorsList";
import { BillsList } from "./BillsList";
import { useDebounce } from "react-use";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/SearchInput";
import { mergeURLSearchParams } from "@/utils/uri";
import { Tag } from "@/components/ui/tag";
import { Logo } from "@/components/Logo";

const LIMIT = 10;
const SEARCH_QUERY_PARAM = "search";
const DEBOUNCE_PERIOD = 300;

type UpdateQueryProps = {
  [SEARCH_QUERY_PARAM]: string;
};

export const SearchPage = () => {
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
      updateQuery({ [SEARCH_QUERY_PARAM]: searchTerm });
    },
    DEBOUNCE_PERIOD,
    [searchTerm]
  );

  const billsQueryParams = useMemo(
    () => ({
      title: querySearchTerm,
      offset: LIMIT,
      limit: LIMIT,
    }),
    [querySearchTerm]
  );

  const legislatorQueryParams = useMemo(
    () => ({
      name: querySearchTerm,
      offset: LIMIT,
      limit: LIMIT,
    }),
    [querySearchTerm]
  );

  const { data: bills, isLoading: isBillsLoading } = useBills(billsQueryParams);
  const { data: legislators, isLoading: isLegislatorsLoading } = useLegislators(
    legislatorQueryParams
  );

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const clearTerm = useCallback(() => setSearchTerm(""), []);

  const isSearching = !!query.get(SEARCH_QUERY_PARAM) && searchTerm;

  return (
    <Flex direction="column" height="100vh" justify="center" gap={12}>
      <Grid gap={4} px={32}>
        <Logo justify="center" />
        <SearchInput value={searchTerm} onChange={handleSearchChange} />
        {isSearching && (
          <Tag justifySelf="flex-end" closable onClose={clearTerm}>
            Search Term: <b>{searchTerm}</b>
          </Tag>
        )}
      </Grid>
      <Grid gap={4} templateColumns="repeat(2, 1fr)">
        <BillsList data={bills} isLoading={isBillsLoading} />
        <LegislatorsList data={legislators} isLoading={isLegislatorsLoading} />
      </Grid>
    </Flex>
  );
};
