import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { sidebarNav } from "@/routes";
import { onKeyDown } from "@/lib/utils";
import { ProductType } from "@/types/product";
import useUploadProductMutation from "@/hooks/product/useUploadProductMutation";
import useUploadProduct from "@/hooks/product/useUploadProduct";
import Combobox from "./ui/comboBox";

export default function AddProductForm({ product }: { product?: ProductType }) {
  const isEdit = product ? true : false;
  const { uploadProduct, isPending } = useUploadProductMutation(isEdit);
  const { previewImages, category, setCategory, onSubmit, addImages, deleteImage, form } = useUploadProduct(
    uploadProduct,
    product
  );

  return (
    <div className="text-zinc-900">
      <Form {...form}>
        {
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex mt-10 flex-row justify-between items-end">
              <div>상품 정보</div>
              <div className="text-xs text-zinc-600">* 필수입력사항</div>
            </div>
            <div className="grid grid-cols-203 gap-5 border border-zinc-300 rounded p-8 mt-3 md:grid-cols-103 md:gap-4">
              <FormLabel>카테고리 *</FormLabel>
              <FormField
                control={form.control}
                name="category"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Combobox categories={sidebarNav} category={category} setCategory={setCategory} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div />
              <FormLabel>상품명 *</FormLabel>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div />
              <FormLabel>판매가 *</FormLabel>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="number" onKeyDown={onKeyDown} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div />
              <FormLabel>재고수량 *</FormLabel>
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="number" onKeyDown={onKeyDown} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div />
              <FormLabel>상품 이미지 *</FormLabel>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
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
                  </FormItem>
                )}
              />
              <div />

              <FormLabel>상품설명 *</FormLabel>
              <div className="grid-cols-subgrid col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          {...field}
                          className="text-zinc-800 text-sm pl-3 pt-2 border border-zinc-400 rounded w-full h-44 resize-none"
                        />
                      </FormControl>
                      <div className="hidden md:flex">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className=" mt-6 mb-3 text-base">부가정보</div>
              <div />
              <div />

              <FormLabel>Artist</FormLabel>
              <FormField
                control={form.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div />
              <FormLabel>Label</FormLabel>
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div />
              <FormLabel>Released</FormLabel>
              <FormField
                control={form.control}
                name="released"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div />
              <FormLabel>Format</FormLabel>
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} onKeyDown={onKeyDown} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div />
            </div>
            <div className="flex w-full justify-center">
              <Button type="submit" className="mt-6 mb-12 w-32" disabled={isPending}>
                상품 등록
              </Button>
            </div>
          </form>
        }
      </Form>
    </div>
  );
}
