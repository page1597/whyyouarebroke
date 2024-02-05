import { getRandomProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useNavigate } from "react-router-dom";

export default function RecommandProducts({ category, productId }: { category: string; productId: string }) {
  const [recommands, setRecommands] = useState<DocumentData[]>(new Array(4));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 추천상품 4개만 보여짐
  async function getRecommands() {
    try {
      setIsLoading(true);
      const result = await getRandomProducts(productId, category, 4);
      console.log(result);
      setRecommands(result);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    console.log("RecommandProducts useEffect");
    getRecommands();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className="text-zinc-700 ml-8 mt-6">추천 상품</div>
      <div className="flex flex-row justify-center mt-10">
        {!isLoading && recommands[0] != undefined ? (
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
                      <div className="w-60 h-60 bg-slate-300" />
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
