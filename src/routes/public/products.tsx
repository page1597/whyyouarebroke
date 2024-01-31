import { getCategoryProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type categoryProductType = {
  category: string;
  products?: DocumentData[];
};
// 로딩이 느린거
export default function Products() {
  // 구매상품 리스트 목록
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [productsList, setProductsList] = useState<categoryProductType[]>();

  async function getProducts() {
    const rockpopetc = await getCategoryProducts("rock/pop/etc", null);
    const jazz = await getCategoryProducts("jazz", null);
    const ost = await getCategoryProducts("ost", null);
    const kpop = await getCategoryProducts("k-pop", null);
    const jpopCityPopAsia = await getCategoryProducts("j-pop/city pop/asia", null);
    const merchandise = await getCategoryProducts("merchandise", null);

    setProductsList([
      {
        category: "rock/pop/etc",
        products: rockpopetc,
      },
      {
        category: "jazz",
        products: jazz,
      },
      {
        category: "ost",
        products: ost,
      },
      {
        category: "kpop",
        products: kpop,
      },
      {
        category: "j-pop/city pop/asia",
        products: jpopCityPopAsia,
      },
      {
        category: "merchandise",
        products: merchandise,
      },
    ]);
  }

  useEffect(() => {
    getProducts();
    setIsLoaded(true);
  }, []);

  function replaceAll(original: string, searchValue: string, replaceValue: string) {
    const regex = new RegExp(searchValue, "g");
    return original.replace(regex, replaceValue);
  }

  return (
    <>
      <div className="ml-5 text-zinc-900">
        {productsList ? (
          <>
            {productsList?.map((categoryProduct: categoryProductType, index: number) => {
              return (
                <div key={index}>
                  <div className="mb-16">
                    <div className="flex justify-between items-end">
                      <h3 className="text-xl my-5">{categoryProduct.category.toUpperCase()}</h3>
                      <button
                        name="more"
                        onClick={() => navigate(`/category/${replaceAll(categoryProduct.category, "/", "-")}`)}
                      >
                        더보기
                      </button>
                    </div>
                    <Carousel opts={{ align: "start" }}>
                      <CarouselContent className="-ml-2 md:-ml-4">
                        {categoryProduct.products?.map((product: DocumentData, index: number) => {
                          return (
                            <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/4">
                              <div className="p-1">
                                <div>
                                  <div>
                                    {product.image ? (
                                      <img
                                        src={product["image"][0]}
                                        width={60}
                                        height={60}
                                        className="h-60 w-60"
                                        alt={product.name}
                                      />
                                    ) : (
                                      <div className="w-60 h-60 bg-zinc-100" />
                                    )}
                                  </div>
                                  <div className="flex flex-col mt-3">
                                    <div className="flex gap-2">
                                      <div>[{product.type}]</div>
                                      <div className="text-base">{product.name}</div>
                                    </div>
                                    <div className="mt-1 font-bold text-zinc-500">{product.price}원</div>
                                  </div>
                                </div>
                              </div>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                      {
                        <>
                          <CarouselPrevious />
                          <CarouselNext />
                        </>
                      }
                    </Carousel>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>상품이 존재하지 않습니다.</>
        )}
      </div>
    </>
  );
}
