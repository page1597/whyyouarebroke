import { DocumentData } from "firebase/firestore";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useNavigate } from "react-router-dom";
import useGetRecommendProducts from "@/hooks/product/useGetRecommendProducts";
import { preloadImage } from "@/lib/utils";
import { memo } from "react";
import RecommendProductsSkeleton from "../skeleton/recommendProductsSkeleton";
import useWindowWidth from "@/hooks/useWindowWidth";

function RecommendProducts({ category, productId }: { category: string; productId: string }) {
  const navigate = useNavigate();
  const { isLoading, recommends } = useGetRecommendProducts(productId, category, 4);
  const { width } = useWindowWidth();
  return (
    <div>
      <div className="text-zinc-700 ml-2 sm:ml-8 mt-6">추천 상품</div>
      <div className="flex flex-row justify-center sm:mt-10 mt-5">
        {isLoading ? (
          <RecommendProductsSkeleton />
        ) : recommends && recommends.length > 0 ? (
          <Carousel opts={{ align: "start", active: width > 640 ? false : true }} className="w-11/12">
            <CarouselContent>
              {recommends.map((product: DocumentData) => (
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
          <RecommendProductsSkeleton />
        )}
      </div>
    </div>
  );
}

export default memo(RecommendProducts);
