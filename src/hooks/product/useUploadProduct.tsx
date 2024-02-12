import { ProductType } from "@/types/product";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid"; // 고유값 생성
import { fbGetPrevImagesURL } from "@/services/firebase/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addProductFormSchema } from "@/types/formSchemas/addProduct";
import { resizeFile } from "@/lib/utils";

export default function useUploadProduct(product?: ProductType, uploadProduct: any) {
  const [previewImages, setPreviewImages] = useState<string[]>([]); // blob data
  const [category, setCategory] = useState<string>(product ? product.category : "");
  const uploadedDate = +new Date(); // 등록시간 기준
  const uuid = uuidv4();

  // 로딩 추가하기
  useEffect(() => {
    if (product) {
      getPrevImages();
    }
  }, []);

  async function getPrevImages() {
    console.log("원래 있던 이미지", product?.image);
    if (product && product?.image) {
      const result = await fbGetPrevImagesURL(product.id, product?.image);
      setPreviewImages(result); // preview : blob
    }
  }

  // 이미지 추가
  async function addImages(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let images = e.target.files;
    if (images) {
      // 성능 최적화를 위한 이미지 리사이징
      const resizedImages = await Promise.all<string>(Array.from(images).map(resizeFile));
      // 기존 이미지와 새로 리사이징된 이미지를 합친 후 설정
      setPreviewImages((prev) => [...prev, ...resizedImages]);
    }
  }

  // X버튼 클릭 시 이미지 삭제
  function deleteImage(e: MouseEvent<HTMLElement>, id: number) {
    e.preventDefault();
    setPreviewImages(previewImages.filter((_, index) => index !== id));
  }

  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      id: product?.id || uuid,
      category: product?.category || "",
      name: product?.name || "",
      price: product?.price || 0,
      image: previewImages,
      stock: product?.stock || 0,
      description: product?.description || "",
      artist: product?.artist || "",
      label: product?.label || "",
      released: product?.released || "",
      format: product?.format || "",
      createdAt: product?.createdAt || uploadedDate,
    },
  });

  async function onSubmit(values: z.infer<typeof addProductFormSchema>) {
    const product: ProductType = {
      id: values.id,
      category: category,
      name: values.name,
      price: values.price,
      image: previewImages,
      stock: values.stock,
      description: values.description,
      artist: values.artist || null,
      label: values.label || null,
      released: values.released || null,
      format: values.format || null,
      createdAt: values.createdAt,
    };
    uploadProduct(product);
  }

  return { previewImages, category, setCategory, onSubmit, addImages, deleteImage, form };
}
