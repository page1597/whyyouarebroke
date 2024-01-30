import { db, getProducts } from "@/services/firebase";
import { DocumentData, collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { ProductType } from "@/types";

export default function Products() {
  // 판매상품 리스트 목록
  const navigate = useNavigate();

  const fetchData = async (pageParam: number) => {
    console.log("pageParam:", pageParam);
    let products: DocumentData[] = [];
    if (pageParam) {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"), startAfter(pageParam), limit(12));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });
      return products;
    } else {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(12));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });
      return products;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    "products",
    ({ pageParam }) => fetchData(pageParam),
    {
      getNextPageParam: (querySnapshot) => {
        // 다음 페이지 번호 가져오는

        console.log(querySnapshot.length, querySnapshot);
        if (querySnapshot.length < 12) {
          console.log("더이상 불러올게 없음");
          return null; // pageParam을 리턴
        } else {
          return querySnapshot[querySnapshot.length - 1].createdAt; // pageParam을 리턴
        }
      },
    }
  );
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <>
      <h3 className="text-xl">전체 상품</h3>
      <button onClick={() => navigate("/add-product")}>상품 등록 버튼</button>
      <div>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page ? (
              <div className="grid grid-cols-4 mt-5 gap-1">
                {page?.map((value: DocumentData, index: number) => {
                  return (
                    <div key={index} onClick={() => navigate("/product", { state: value as DocumentData })}>
                      {value.image && <img src={value["image"][0]} className="h-48 w-48" />}
                      <div className="text-sm">{value["name"]}</div>
                      <div className="text-sm font-bold text-zinc-500">{value["price"]}원</div>
                      {/* 일단 맨 처음 있는 사진으로 하기(나중에 썸네일 설정 가능하게 바꾸기) */}
                      {/* {value["image"].map((src: string, index: number) => {
                    return <img key={index} className="h-20 w-20" src={src}></img>;
                  })} */}
                      {/* </div> */}
                    </div>
                  );
                })}
              </div>
            ) : (
              <>상품이 존재하지 않습니다.</>
            )}
          </div>
        ))}
      </div>
      <div ref={inViewRef} className="h-42 w-full">
        {/* loading indicator */}
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </>
  );
}
