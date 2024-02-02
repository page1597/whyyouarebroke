import { getCategoryProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useNavigate } from "react-router-dom";

export default function RecommandProducts({ category, productId }: { category: string; productId: string }) {
  const [recommands, setRecommands] = useState<DocumentData[] | undefined>(new Array(4));

  async function getRecommands() {
    // 추천상품 4개만 보여짐
    const result = await getCategoryProducts(category, "createdAt", 4, null);
    const recommandList = result.filter((value: DocumentData) => value.id !== productId);
    const filledRecommands = Array.from(
      { length: 4 - recommandList.length },
      () => undefined
    ) as unknown as DocumentData[];
    setRecommands([...recommandList, ...filledRecommands]);
  }
  useEffect(() => {
    getRecommands();
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-zinc-700 ml-8 mt-6">추천 상품</div>
      <div className="flex flex-row justify-center mt-10">
        {recommands ? (
          <Carousel opts={{ align: "start" }} className=" w-11/12">
            <CarouselContent className="-ml-2">
              {recommands.map((product: DocumentData) => (
                <CarouselItem key={product?.id} className="pl-1 basis-1/2 md:basis-1/4">
                  <div className="p-1 flex justify-center">
                    {product?.image ? (
                      <div
                        className="relative overflow-hidden"
                        onClick={() => {
                          navigate({ pathname: "/product", search: `?id=${product.id}` });
                          window.location.reload(); // 이렇게 하는게 맞나?
                        }}
                      >
                        <img
                          src={product["image"][0]}
                          width={240}
                          height={240}
                          className="h-60 w-60 object-contain transition-transform transform-gpu hover:scale-105"
                          alt={product?.name}
                        />
                      </div>
                    ) : (
                      <div className="w-60 h-60" />
                    )}
                    {/* <div className="text-sm">{product["name"]}</div>
                    <div className="text-sm font-bold text-zinc-500">{product["price"]}원</div> */}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p>추천 상품이 존재하지 않습니다.</p>
        )}
      </div>
    </div>
  );
}
