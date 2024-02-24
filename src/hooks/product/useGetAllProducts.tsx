import { fbGetProducts } from "@/services/firebase/product";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["all products"],
    queryFn: async () => {
      const categories = ["rock/pop/etc", "hip hop/r&b", "jazz", "ost", "k-pop", "j-pop/city pop/asia", "merchandise"];
      const productPromises = categories.map((category) =>
        fbGetProducts(category, null, null, "createdAt", null, null)
      );
      const products = await Promise.all(productPromises);
      return categories.map((category, index) => ({ category, products: products[index] }));
    },
  });

  return { isLoading, productList: data };
}
