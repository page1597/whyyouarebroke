import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import _ from "lodash";
import { getProducts } from "@/services/firebase";

import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

export default function SearchFilterProducts() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
  const debounceDelay = 1000;

  const navigate = useNavigate();
  const debouncedSearch = useCallback(
    _.debounce((value: string) => {
      setDebouncedSearchValue(value);
    }, debounceDelay),
    []
  );
  const { data } = useQuery({
    queryKey: ["search products", debouncedSearchValue],
    queryFn: () =>
      getProducts(null, "createdAt", 12, null, debouncedSearchValue == "" ? "!invalid!" : debouncedSearchValue),
  });
  useEffect(() => {
    // 컴포넌트가 언마운트될 때 debounce 함수를 클리어
    return () => {
      debouncedSearch.cancel(); // debounce 함수 클리어
    };
  }, []);

  // useEffect(() => {
  //   handleSearch.cancel();
  //   return () => {
  //     // 컴포넌트가 언마운트될 때 debounce 함수를 클리어
  //     handleSearch.cancel();
  //   };
  // }, []);

  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    debouncedSearch(searchValue);
  }
  return (
    <>
      <Input className="bg-zinc-600 text-white h-10" placeholder="상품을 검색하세요." onChange={onSearch} />
      <div className="flex flex-col pl-4 pt-2">
        {data?.map((product) => (
          <div
            key={product.id}
            className="flex flex-row gap-5 text-zinc-800 cursor-pointer"
            onClick={() => navigate({ pathname: "/product", search: `id=${product.id}` })}
          >
            <img alt={product.name} src={product.image} width={128} height={128} className="w-24 h-24 object-cover" />
            <div className="flex flex-col relative w-full gap-2 text-sm">
              <div>
                [{product.type}]{product.name}
              </div>
              <div>카테고리: {product.category}</div>
              <div>가격: {product.price}원</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
