import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { NavigateFunction } from "react-router-dom";
import { ProductType } from "@/types";
import { addProduct, getPrevImagesURL } from "@/services/firebase";
import { ChangeEvent, useEffect, useState } from "react";
import { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid"; // 고윳값 생성
import { ComboboxDemo } from "./ui/comboBox";
import { sidebarNav } from "@/routes";
import Resizer from "react-image-file-resizer";

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const formSchema = z.object({
  id: z.string(),
  category: z.string(),
  name: z.string(),
  price: z.preprocess(Number, z.number()),
  //   image: z
  //     .any()
  //     .refine((files) => {
  //       return files?.[0]?.size <= MAX_FILE_SIZE;
  //     }, `Max image size is 5MB.`)
  //     .refine(
  //       (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
  //       "Only .jpg, .jpeg, .png and .webp formats are supported."
  //     ),
  image: z.any(),
  stock: z.preprocess(Number, z.number()),
  description: z.string(),

  artist: z.string().optional(),
  label: z.string().optional(),
  released: z.string().optional(),
  format: z.string().optional(),
  createdAt: z.number(),
});

export default function AddProductForm({ products, navigate }: { products?: ProductType; navigate: NavigateFunction }) {
  const [previewImages, setPreviewImages] = useState<string[]>([]); // blob data
  // const [selectedImages, setSelectedImages] = useState<string[]>([]); // real url data
  const uuid = uuidv4();
  const [category, setCategory] = useState<string>(products ? products.category : "");
  // 등록시간 기준
  const uploadedDate = +new Date();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: products?.id || uuid,
      category: products?.category || "",
      name: products?.name || "",
      price: products?.price || 0,
      image: previewImages, // 추가되는 형식으로 바꾸기
      stock: products?.stock || 0,
      description: products?.description || "",
      artist: products?.artist || "",
      label: products?.label || "",
      released: products?.released || "",
      format: products?.format || "",
      createdAt: products?.createdAt || uploadedDate,
    },
  });

  async function getPrevImages() {
    if (products) {
      const result = await getPrevImagesURL(products.id, products?.image);
      setPreviewImages(result); // preview : blob
      // setSelectedImages(result[1]); // selected : data_url
    }
  }
  // 로딩 추가하기
  useEffect(() => {
    getPrevImages();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
    addProduct(product).then(() => {
      alert(product ? "상품을 수정했습니다." : "상품을 등록했습니다.");
      navigate("/");
    });
  }

  const resizeFile = (file: Blob) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "WEBP",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  let previewImageUrlList: any[] = [...previewImages];
  // let dataUrlList: string[] = [...selectedImages];
  async function addImages(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let images = e.target.files;

    // 왜 갑자기 두개씩 선택이 안되는가
    if (images) {
      console.log(images.length);
      // 성능 최적화를 위한 이미지 리사이징 기능

      for (let i = 0; i < images.length; i++) {
        const resizedImage = await resizeFile(images[i]);

        // dataUrlList.push(image);
        // previewImageUrlList.push(resizedBlob);
        previewImageUrlList.push(resizedImage);
        // const previewImageUrl = URL.createObjectURL(images[i]); // 프리뷰를 위한 Url list
        // previewImageUrlList.push(previewImageUrl);
        // URL.revokeObjectURL(previewImageUrl); // 메모리 누수 방지

        // let fileReader = new FileReader();
        // fileReader.onload = () => {
        //   dataUrlList.push(fileReader.result as string);
        // };
        // fileReader.readAsDataURL(images[i]);
      }
      console.log(previewImageUrlList);
      // setPickedImages(resizedFileList);
      // console.log(dataUrlList);
      // console.log(previewImageUrlList); // blob:~
      // setSelectedImages(previewImageUrlList);
      setPreviewImages(previewImageUrlList);
    }
  }

  // useEffect(() => {
  //   console.log(previewTestImages);
  // }, [previewTestImages]);
  // X버튼 클릭 시 이미지 삭제
  function deleteImage(e: MouseEvent<HTMLElement>, id: number) {
    e.preventDefault();
    setPreviewImages(previewImages.filter((_, index) => index !== id));
    // setSelectedImages(selectedImages.filter((_, index) => index !== id));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* 소셜 로그인 - 구글 */}
          <div className="flex mt-10 flex-row justify-between items-end">
            <div>상품정보</div>
            <div className="text-xs text-zinc-600">* 필수입력사항</div>
          </div>
          {/* md:hidden grid grid-cols-302 gap-5 border border-zinc-300 rounded p-8 mt-3 */}
          {/* (min-width: 768px)  */}
          <div className="grid grid-cols-302 gap-5 border border-zinc-300 rounded p-8 mt-3 md:grid-cols-102 md:gap-4">
            {/* md 이상의 뷰포트에서만 보임 */}

            <FormLabel>카테고리 *</FormLabel>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <ComboboxDemo categories={sidebarNav} category={category} setCategory={setCategory} {...field} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>상품명 *</FormLabel>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input {...field} onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>판매가 *</FormLabel>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input {...field} type="number" onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage>숫자만 입력</FormMessage>
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>재고수량 *</FormLabel>
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input {...field} type="number" onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage>숫자만 입력</FormMessage>
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>상품이미지 *</FormLabel>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <div className="flex">
                        <div className="flex gap-2">
                          {previewImages?.map((image, id) => (
                            <div key={id} className="w-20 h-20 relative">
                              <img src={image} alt={`${image}-${id}`} className="w-full h-full absolute" />
                              <button onClick={(e) => deleteImage(e, id)} className="absolute right-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#000000"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        <Label htmlFor="input-file">
                          <div className="flex justify-center items-center w-20 h-20 rounded border border-zinc-400 bg-zinc-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#828282"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>

                            <input
                              {...field}
                              type="file"
                              className="hidden"
                              multiple
                              id="input-file"
                              onChange={addImages}
                              onKeyDown={onKeyDown}
                            />
                          </div>
                        </Label>
                      </div>
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>상품설명 *</FormLabel>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input {...field} onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <hr />
            <hr />
            <div>부가정보</div>
            <div />
            <FormLabel>Artist</FormLabel>
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>Label</FormLabel>
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input {...field} onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>Released</FormLabel>
            <FormField
              control={form.control}
              name="released"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input {...field} onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>Format</FormLabel>
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input {...field} onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-center">
            <Button type="submit" className="mt-6 w-32">
              상품등록
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
