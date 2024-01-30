import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { NavigateFunction } from "react-router-dom";
import { ProductType } from "@/types";
import { addProduct, getPrevImagesURL } from "@/services/firebase";
import { useEffect, useState } from "react";
import { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid"; // 고윳값 생성
import { ComboboxDemo } from "./ui/comboBox";
import { sidebarNav } from "@/routes";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
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
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // real url data
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
      image: selectedImages, // 추가되는 형식으로 바꾸기
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
      setPreviewImages(result[0]); // preview : blob
      setSelectedImages(result[1]); // selected : data_url
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
      image: selectedImages,
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

  function addImages(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let images = e.target.files;

    let previewImageUrlList = [...previewImages];
    let dataUrlList = [...selectedImages];

    if (images) {
      for (let i = 0; i < images.length; i++) {
        // 프리뷰를 위한 Url list
        const previewImageUrl = URL.createObjectURL(images[i]);
        previewImageUrlList.push(previewImageUrl);

        let fileReader = new FileReader();
        fileReader.onload = () => {
          dataUrlList.push(fileReader.result as string);
        };
        fileReader.readAsDataURL(images[i]);
      }
      setSelectedImages(dataUrlList);
      setPreviewImages(previewImageUrlList);
    }
  }
  // X버튼 클릭 시 이미지 삭제
  function deleteImage(e: MouseEvent<HTMLElement>, id: number) {
    e.preventDefault();
    setPreviewImages(previewImages.filter((_, index) => index !== id));
    setSelectedImages(selectedImages.filter((_, index) => index !== id));
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
          <div className="hidden md:grid grid-cols-102 gap-4 border border-zinc-300 rounded p-8 mt-3">
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
                          {previewImages.map((image, id) => (
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
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
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
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            <Input
                              {...field}
                              type="file"
                              className="hidden"
                              id="input-file"
                              multiple
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

          {/* 모바일 화면 */}
          <div className="md:hidden grid grid-cols-302 gap-5 border border-zinc-300 rounded p-8 mt-3">
            <FormLabel>이메일 *</FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormControl>
                      <Input {...field} className="w-56" onKeyDown={onKeyDown} />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>회원 구분 *</FormLabel>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem {...field}>
                  <FormControl>
                    <RadioGroup className="flex" defaultValue={"일반 회원"} onValueChange={field.onChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="일반 회원" defaultChecked={true} />
                        <Label htmlFor="일반 회원">일반 회원</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="관리자" />
                        <Label htmlFor="관리자">관리자</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormLabel>비밀번호 *</FormLabel>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormControl>
                      <Input type="password" {...field} className="w-56" />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />

            <FormLabel>비밀번호 확인 *</FormLabel>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormControl>
                      <Input type="password" {...field} className="w-56" />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormLabel>이름 *</FormLabel>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormControl>
                      <Input {...field} className="w-56" />
                    </FormControl>
                    <FormMessage className="mt-2" />
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
