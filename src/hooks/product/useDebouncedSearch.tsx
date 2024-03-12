import { useState, useCallback, useEffect, ChangeEvent } from "react";
import debounce from "lodash.debounce";

export default function useDebouncedSearch(debounceDelay: number = 1000) {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((value: string) => {
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
