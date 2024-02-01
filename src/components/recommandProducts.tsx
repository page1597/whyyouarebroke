import { getCategoryProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function RecommandProducts({ category, productName }: { category: string; productName: string }) {
  const [recommands, setRecommands] = useState<DocumentData[]>();

  async function getRecommands() {
    // 추천상품 4개만 보여짐
    const result = await getCategoryProducts(category, "createdAt", null, 4);
    const recommandList = result.filter((value: DocumentData) => value.name !== productName);
    setRecommands(recommandList);
  }
  useEffect(() => {
    getRecommands();
  }, []);

  return (
    <div>
      <div className="text-zinc-700 ml-8 mt-6">추천 상품</div>
      <div className="flex flex-row justify-center mt-10">
        {recommands ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {recommands.map((product: DocumentData) => (
              <div onClick={() => {}} className="flex flex-col justify-center cursor-pointer" key={product.id}>
                {product.image ? (
                  <img src={product["image"][0]} width={50} height={50} className="h-48 w-48" alt={product.name} />
                ) : (
                  <div className="w-48 h-48 bg-zinc-100" />
                )}
                <div className="text-sm">{product["name"]}</div>
                <div className="text-sm font-bold text-zinc-500">{product["price"]}원</div>
              </div>
            ))}
          </div>
        ) : (
          <p>추천 상품이 존재하지 않습니다.</p>
        )}
      </div>
    </div>
  );
}
