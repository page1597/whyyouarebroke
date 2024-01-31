import { getCategoryProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Products({ category }: { category: string }) {
  const navigate = useNavigate();
  const [orderby, setOrderby] = useState<string>("createdAt");
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
  });

  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    ["products", category, orderby],
    ({ pageParam }) => getCategoryProducts(category, orderby, pageParam),
    {
      getNextPageParam: (querySnapshot) => {
        if (querySnapshot.length < 12) {
          return null;
        } else {
          return querySnapshot[querySnapshot.length - 1].createdAt;
        }
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, orderby]);

  const changeOrderby = (order: string) => {
    setOrderby(order);
    refetch();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <h3 className="text-xl">{category.toUpperCase()}</h3>
        <div className="flex gap-3">
          <button
            name="createdAt"
            value={orderby}
            onClick={() => changeOrderby("createdAt")}
            className={`bg-transparent text-zinc-600 hover:bg-transparent text-sm ${orderby == "createdAt" ? "font-bold" : "font-medium"}`}
          >
            최신순
          </button>
          <button
            name="price"
            value={orderby}
            onClick={() => changeOrderby("price")}
            className={`bg-transparent text-zinc-600 hover:bg-transparent text-sm ${orderby == "price" ? "font-extrabold" : "font-medium"}`}
          >
            가격순
          </button>
        </div>
      </div>

      {status === "success" ? (
        <div>
          {data?.pages.map((page, index) => (
            <div key={index}>
              {page ? (
                <div className="grid grid-cols-2 md:grid-cols-4">
                  {page?.map((value: DocumentData, index: number) => (
                    <div
                      className="flex flex-col justify-center items-center cursor-pointer"
                      key={index}
                      onClick={() => navigate("/product", { state: value as DocumentData })}
                    >
                      {value.image ? (
                        <img src={value["image"][0]} width={60} height={60} className="h-60 w-60" alt={value.name} />
                      ) : (
                        <div className="w-60 h-60 bg-zinc-100" />
                      )}
                      <div className="text-sm">{value["name"]}</div>
                      <div className="text-sm font-bold text-zinc-500">{value["price"]}원</div>
                    </div>
                  ))}
                </div>
              ) : (
                <>상품이 존재하지 않습니다.</>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>loading...</>
      )}
      <div ref={inViewRef} className="h-42 w-full">
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </>
  );
}
