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
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [productsList, setProductsList] = useState<categoryProductType[]>();
  const orderby = "createdAt"; // 정렬 최신순

  async function getProducts() {
    const categories = ["rock/pop/etc", "jazz", "ost", "k-pop", "j-pop/city pop/asia", "merchandise"];
    const productPromises = categories.map((category) => getCategoryProducts(category, orderby, null, null));
    const products = await Promise.all(productPromises);

    setProductsList(
      categories.map((category: string, index: number) => ({
        category,
        products: products[index],
      }))
    );
  }

  useEffect(() => {
    getProducts();
    setIsLoaded(true);
  }, []);

  function replaceAll(original: string, ...replacements: [searchValue: string, replaceValue: string][]) {
    let replacedString = original;
    replacements.forEach(([searchValue, replaceValue]) => {
      const regex = new RegExp(searchValue, "g");
      replacedString = replacedString.replace(regex, replaceValue);
    });
    return replacedString;
  }

  return (
    <div className="ml-5 text-zinc-900">
      {productsList ? (
        <>
          {productsList?.map((categoryProduct: categoryProductType, index: number) => (
            <div key={index} className="mb-16">
              <div className="flex justify-between items-end">
                <h3 className="text-xl my-5">{categoryProduct.category.toUpperCase()}</h3>
                <button
                  name="more"
                  onClick={() => {
                    navigate(`/category/${replaceAll(categoryProduct.category, ["-", ""], ["/", "-"], [" ", ""])}`);
                  }}
                >
                  더보기
                </button>
              </div>
              <Carousel opts={{ align: "start" }} className=" w-11/12">
                <CarouselContent className="-ml-2">
                  {/* -ml-2 md:-ml */}
                  {categoryProduct.products?.map((product: DocumentData) => (
                    <CarouselItem key={product.id} className="pl-1 basis-1/2 md:basis-1/4">
                      <div className="p-1 flex justify-center">
                        {/* onClick={() => navigate("/product", { state: value as DocumentData } */}
                        <div className="cursor-pointer" onClick={() => navigate("/product", { state: product })}>
                          {product.image ? (
                            <div className="relative overflow-hidden">
                              <img
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
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ))}
        </>
      ) : (
        <p>상품이 존재하지 않습니다.</p>
      )}
    </div>
  );
}
