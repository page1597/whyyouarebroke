import { DocumentData } from "firebase/firestore";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import useGetRecommandProducts from "@/hooks/product/useGetRecommandProducts";
import { preloadImage } from "@/lib/utils";
import { memo, useEffect, useState } from "react";
import RecommandProductsSkeleton from "./skeleton/recommandProductsSkeleton";

function RecommandProducts({ category, productId }: { category: string; productId: string }) {
  const navigate = useNavigate();
  const { isLoading, recommands } = useGetRecommandProducts(productId, category, 4);
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <div className="text-zinc-700 ml-2 sm:ml-8 mt-6">추천 상품</div>
      <div className="flex flex-row justify-center sm:mt-10 mt-5">
        {isLoading ? (
          <RecommandProductsSkeleton />
        ) : recommands && recommands.length > 0 ? (
          <Carousel opts={{ align: "start", active: width > 640 ? false : true }} className="w-11/12">
            <CarouselContent>
              {recommands.map((product: DocumentData) => (
                <CarouselItem key={product?.id} className="basis-1/2 sm:basis-1/4 cursor-pointer flex justify-center">
                  <div className="sm:flex hidden">
                    <div
                      className="relative overflow-hidden"
                      onClick={() => {
                        preloadImage(product.image, product.name);
                        navigate({ pathname: "/product", search: `?id=${product.id}` });
                      }}
                    >
                      <img
                        src={product.image[0]}
                        width={240}
                        height={240}
                        className="object-contain transition-transform transform-gpu hover:scale-105"
                        alt={product?.name}
                      />
                    </div>
                  </div>
                  <div className="sm:hidden flex">
                    <div
                      className="relative overflow-hidden"
                      onClick={() => {
                        preloadImage(product.image, product.name);
                        navigate({ pathname: "/product", search: `?id=${product.id}` });
                      }}
                    >
                      <img
                        src={product.image[0]}
                        width={160}
                        height={160}
                        className=" object-contain transition-transform transform-gpu hover:scale-105"
                        alt={product?.name}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="sm:mt-0 mt-6" />
            <CarouselNext className="sm:mt-0 mt-6" />
          </Carousel>
        ) : (
          <RecommandProductsSkeleton />
        )}
      </div>
    </div>
  );
}

export default memo(RecommandProducts);
