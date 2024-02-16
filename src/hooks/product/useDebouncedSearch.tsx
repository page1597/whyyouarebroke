import { useState, useCallback, useEffect, ChangeEvent } from "react";
import _ from "lodash";

function useDebouncedSearch(debounceDelay: number = 1000) {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");

  const debouncedSearch = useCallback(
    _.debounce((value: string) => {
      setDebouncedSearchValue(value);
    }, debounceDelay),
    [debounceDelay]
  );

  // 컴포넌트가 언마운트될 때 debounce 함수 클리어
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      debouncedSearch(searchValue);
    },
    [debouncedSearch]
  );

  return { debouncedSearchValue, onSearch };
}
export default useDebouncedSearch;
