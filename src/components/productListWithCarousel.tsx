import { preloadImage, replaceAll } from "@/lib/utils";
import { categoryProductType } from "@/types/product";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";

export default function ProductListWithCarousel({ productList }: { productList: categoryProductType[] }) {
  const navigate = useNavigate();
  return (
    <div className="md:px-0 -ml-4 -mr-5 md:mx-0">
      {productList?.map((categoryProduct, index) => (
        <div key={index} className="md:mb-16 mb-10">
          <div className="flex justify-between items-end mr-6 md:mr-12 md:my-5 my-3">
            <h3 className="text-xl ml-1">{categoryProduct.category.toUpperCase()}</h3>
            <button
              name="more"
              onClick={() => {
                const formattedCategory = replaceAll(categoryProduct.category, ["-", ""], ["/", "-"], [" ", ""]);
                navigate(`/category/${formattedCategory}`);
              }}
            >
              더보기
            </button>
          </div>
          <Carousel opts={{ align: "start" }} className="w-11/12 md:ml-5">
            <CarouselContent className="ml-0 ">
              {categoryProduct.products?.map((product: DocumentData) => (
                <CarouselItem key={product.id} className="pl-0 md:ml-0  basis-1/2 md:basis-1/4">
                  <div className="md:p-2 flex justify-center items-centers">
                    <div
                      className="cursor-pointer flex justify-center flex-col"
                      onClick={() => {
                        preloadImage(product.image, product.name);
                        navigate({ pathname: "/product", search: `?id=${product.id}` });
                      }}
                    >
                      <div className="md:flex hidden">
                        {product.image ? (
                          <div className="relative overflow-hidden">
                            <img
                              decoding="async"
                              loading="lazy"
                              src={product["image"][0]}
                              width={240}
                              height={240}
                              className="h-60 w-60 object-contain transition-transform transform-cpu hover:scale-105"
                              alt={product.name}
                            />
                          </div>
                        ) : (
                          <div className="w-60 h-60 bg-zinc-100" />
                        )}
                      </div>
                      <div className="md:hidden flex h-40 justify-center items-center ">
                        {product.image ? (
                          <div className="relative overflow-hidden">
                            <img
                              decoding="async"
                              loading="lazy"
                              src={product["image"][0]}
                              width={160}
                              height={160}
                              className=" h-40 w-40 object-contain transition-transform transform-cpu hover:scale-105"
                              alt={product.name}
                            />
                          </div>
                        ) : (
                          <div className="w-40 h-40 bg-zinc-100" />
                        )}
                      </div>
                      <div className="flex flex-col mt-3">
                        {/* <div className="truncate bg-teal-200">display nameasdfasfasdfasdfsadf</div> */}
                        <div className="flex gap-1 h-6 ">
                          <div>[{product.format}]</div>
                          <div className="text-base overflow-hidden text-ellipsis">{product.name}</div>
                        </div>
                        <div className="mt-1 font-bold text-zinc-500">{product.price}원</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div>
              <CarouselPrevious />
              <CarouselNext />
            </div>
            {/* <div className="md:hidden flex -mt-12 bg-slate-300">
              <CarouselPrevious />
              <CarouselNext />
            </div> */}
          </Carousel>
        </div>
      ))}
    </div>
  );
}
