import { preloadImage, replaceAll } from "@/lib/utils";
import { categoryProductType } from "@/types/product";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";

export default function ProductListWithCarousel({ productList }: { productList: categoryProductType[] }) {
  const navigate = useNavigate();
  return (
    <div className="sm:px-0 -ml-4 -mr-5 sm:mx-0">
      {productList?.map((categoryProduct, index) => (
        <div key={index} className="sm:mb-16 mb-10">
          <div className="flex justify-between items-end mr-6 sm:mr-12 sm:my-5 my-3">
            <h3 className="sm:text-xl text-lg ml-1">{categoryProduct.category.toUpperCase()}</h3>
            <button
              name="more"
              className="sm:text-base text-sm"
              onClick={() => {
                const formattedCategory = replaceAll(categoryProduct.category, ["-", ""], ["/", "-"], [" ", ""]);
                navigate(`/category/${formattedCategory}`);
              }}
            >
              더보기
            </button>
          </div>
          <Carousel opts={{ align: "start" }} className="w-11/12 sm:ml-5">
            <CarouselContent className="ml-0 ">
              {categoryProduct.products?.map((product: DocumentData) => (
                <CarouselItem key={product.id} className="pl-0 sm:ml-0  basis-1/2 sm:basis-1/4">
                  <div className="sm:p-2 flex justify-center items-centers">
                    <div
                      className="cursor-pointer flex justify-center flex-col"
                      onClick={() => {
                        preloadImage(product.image, product.name);
                        navigate({ pathname: "/product", search: `?id=${product.id}` });
                      }}
                    >
                      <div className="sm:flex hidden">
                        <div className="relative overflow-hidden">
                          <img
                            decoding="async"
                            src={product["image"][0]}
                            width={240}
                            height={240}
                            className="object-contain transition-transform transform-cpu hover:scale-105"
                            alt={product.name}
                          />
                        </div>
                      </div>
                      <div className="sm:hidden flex h-40 justify-center items-center ">
                        <div className="relative overflow-hidden">
                          <img
                            decoding="async"
                            src={product["image"][0]}
                            width={160}
                            height={160}
                            className="object-contain transition-transform transform-cpu hover:scale-105"
                            alt={product.name}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col sm:mt-3 mt-2 sm:text-base text-sm">
                        {/* <div className="truncate bg-teal-200">display nameasdfasfasdfasdfsadf</div> */}
                        <div className="flex gap-1 h-6 ">
                          <div>[{product.format}]</div>
                          <div className="overflow-hidden text-ellipsis">{product.name}</div>
                        </div>
                        <div className="sm:mt-1 font-bold text-zinc-500">{product.price.toLocaleString()}원</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="sm:-mt-6" />
            <CarouselNext className="sm:-mt-6" />
            {/* <div className="sm:hidden flex -mt-12 bg-slate-300">
              <CarouselPrevious />
              <CarouselNext />
            </div> */}
          </Carousel>
        </div>
      ))}
    </div>
  );
}
