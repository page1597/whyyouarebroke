import { DocumentData } from "firebase/firestore";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import useGetRecommandProducts from "@/hooks/product/useGetRecommandProducts";
import { preloadImage } from "@/lib/utils";

function RecommandProducts({ category, productId }: { category: string; productId: string }) {
  const navigate = useNavigate();
  const { isLoading, recommands } = useGetRecommandProducts(productId, category, 4);

  return (
    <div>
      <div className="text-zinc-700 ml-8 mt-6">추천 상품</div>
      <div className="flex flex-row justify-center mt-10">
        {!isLoading && recommands[0] != undefined ? (
          <Carousel opts={{ align: "start" }} className="w-11/12">
            <CarouselContent className="-ml-2">
              {recommands.map((product: DocumentData) => (
                <CarouselItem key={product?.id} className="pl-1 basis-1/2 md:basis-1/4 cursor-pointer">
                  <div className="p-1 flex justify-center">
                    {product?.image ? (
                      <div
                        className="relative overflow-hidden"
                        onClick={() => {
                          preloadImage(product.image, product.name);
                          navigate({ pathname: "/product", search: `?id=${product.id}` });
                          window.location.reload(); // 이렇게 하는게 맞나?
                        }}
                      >
                        <img
                          decoding="async"
                          loading="lazy"
                          src={product.image[0]}
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
            <div className="md:hidden">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        ) : (
          <p>추천 상품이 존재하지 않습니다.</p>
        )}
      </div>
    </div>
  );
}
export default RecommandProducts;
