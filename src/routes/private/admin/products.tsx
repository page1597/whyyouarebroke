import { getProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  // 판매상품 리스트 목록
  const navigate = useNavigate();
  const [products, setProducts] = useState<DocumentData[]>();

  async function getProductList() {
    const result = await getProducts();
    setProducts(result);

    console.log(result);
  }
  useEffect(() => {
    getProductList();
  }, []);
  useEffect(() => {
    console.log("상품 목록!!!!");
    console.log(products);
  }, [products]);
  return (
    <>
      <h3 className="text-xl">전체 상품</h3>
      <button onClick={() => navigate("/add-product")}>상품 등록 버튼</button>

      {products ? (
        <div className="grid grid-cols-4 mt-5 gap-1">
          {products?.map((value, index) => {
            return (
              <div key={index} onClick={() => navigate("/edit-product", { state: value })}>
                <img src={value["image"][0]} className="h-48 w-48" />
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
    </>
  );
}
