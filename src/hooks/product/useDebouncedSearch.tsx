import { useState, useCallback, useEffect, ChangeEvent } from "react";
import _ from "lodash";

export default function useDebouncedSearch(debounceDelay: number = 1000) {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");

  const debouncedSearch = useCallback(
    _.debounce((value: string) => {
      setDebouncedSearchValue(value);
    }, debounceDelay),
    []
  );

  // 컴포넌트가 언마운트될 때 debounce 함수 클리어
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;
    debouncedSearch(searchValue);
  }

  return { debouncedSearchValue, onSearch };
}
