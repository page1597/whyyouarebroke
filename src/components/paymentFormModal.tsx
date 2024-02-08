import { useContext, useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/formInput";
import { Checkbox } from "@/components/ui/checkbox";
import PaymentButton from "./paymentButton";
import { BasketProductType } from "@/types";
import { AuthContext } from "@/context/authContext";
import { Button } from "./ui/button";
import { getProduct, updateProduct } from "@/services/firebase";
import { BasketContext } from "@/context/basketContext";
import { useMutation } from "@tanstack/react-query";

function PaymentFormModal({
  checkedProducts,
  basketProducts,
}: {
  checkedProducts: BasketProductType[];
  basketProducts: BasketProductType[];
}) {
  // 모달창 직접 구현
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useContext(AuthContext);
  const [isAgreedTerm, setIsAgreedTerm] = useState(false);

  // let orderProducts: BasketProductType[] = checkedProducts; // 원래는 체크한 것들만 orderProducts인데
  const [orderProducts, setOrderProducts] = useState<BasketProductType[]>(checkedProducts);
  const shippingFee = 3000;
  const [totalPrice, setTotalPrice] = useState<number>();
  const [isAllButton, setIsAllButton] = useState(false);

  const contextValue = useContext(BasketContext);
  if (!contextValue) {
    throw new Error("BasketContext를 찾을 수 없습니다.");
  }
  const { setBasket } = contextValue;

  useEffect(() => {
    setOrderProducts(checkedProducts);
  }, [checkedProducts]);

  const { mutate } = useMutation({
    mutationKey: ["update product"],
    mutationFn: ({ type, DBStock, product }: { type: string; DBStock: number; product: BasketProductType }) =>
      updateProduct(product.id, type == "add" ? DBStock + product.quantity : DBStock - product.quantity),
    onSuccess: () => {
      console.log("상품 수량 업데이트 성공");
      // navigate("/");
    },
    onError: (error) => {
      console.log("상품 수량 업데이트 실패", error);
    },
  });

  async function openModal(orderProducts: BasketProductType[]) {
    // 실제 결제 진행 전 firebase DB에서 재고수량 미리 감소시키기
    if (orderProducts.length > 0) {
      // 상품 재고 수량 미리 업데이트
      // 1. 재고가 부족한 상품이 있는지 확인
      let isOutOfStock = false;
      for (const product of orderProducts) {
        const DBProduct = await getProduct(product.id);
        const DBStock = DBProduct?.stock;

        if (DBStock - product.quantity < 0) {
          alert(`${product.name}의 상품 재고가 부족하여 구매가 불가능합니다.`);
          isOutOfStock = true;
          return; // 함수 종료
        }
      }
      // 2. 모든 제품의 재고가 충분한 경우에만 DB 업데이트 수행
      if (!isOutOfStock) {
        for (const product of orderProducts) {
          try {
            const DBProduct = await getProduct(product.id);
            const DBStock = DBProduct?.stock;

            // await updateProduct(product.id, DBStock - product.quantity);
            mutate({ type: "subtract", DBStock, product });
            setBasket((prevBasket) => {
              const updatedBasket = prevBasket.map((basketProduct) => {
                if (basketProduct.id === product.id) {
                  return { ...basketProduct, stock: DBStock - product.quantity };
                }
                return basketProduct;
              });
              return updatedBasket;
            });
          } catch (e) {
            console.error("상품 재고 업데이트 실패:", e);
            return product;
          }
        }

        setIsOpen(true);
        setTotalPrice(
          orderProducts.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0)
        );
      }
    } else {
      alert("주문하려는 상품을 선택해 주세요.");
      return;
    }
  }

  async function closeModal() {
    // alert("주문을 취소하시겠습니까?")
    // orderProducts는 항상 크기가 1이상이고, 재고가 부족한 경우가 없다.
    let orderProductList: BasketProductType[] = orderProducts;
    if (isAllButton) {
      orderProductList = basketProducts;
    }
    console.log(orderProductList);
    for (const product of orderProductList) {
      try {
        const DBProduct = await getProduct(product.id);
        const DBStock = DBProduct?.stock;

        // 실제 DB 업데이트
        // await updateProduct(product.id, DBStock + product.quantity);
        mutate({ type: "add", DBStock, product });
        setBasket((prevBasket) => {
          const updatedBasket = prevBasket.map((basketProduct) => {
            if (basketProduct.id === product.id) {
              return { ...basketProduct, stock: DBStock + product.quantity };
            }
            return basketProduct;
          });
          return updatedBasket;
        });
      } catch (e) {
        console.error("상품 재고 업데이트 실패:", e);
        return product;
      }
    }
    setIsOpen(false);
  }
  const formSchema = z.object({
    buyer_name: z.string(),
    buyer_addr: z.string(),
    buyer_tel: z.string(),
    buyer_email: z.string(),
    buyer_postcode: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyer_name: userInfo?.name || "",
      buyer_addr: "",
      buyer_tel: "",
      buyer_email: userInfo?.email || "",
      buyer_postcode: "",
    },
  });
  useEffect(() => {
    console.log(isAllButton);
  }, [isAllButton]);
  return (
    <div>
      <div className="flex justify-center gap-5 mt-12">
        <Button
          name="selected"
          onClick={() => {
            setIsAllButton(false);
            openModal(orderProducts);
          }}
          className="bg-white border text-zinc-800 border-zinc-800 hover:bg-zinc-100"
        >
          선택상품주문
        </Button>
        <Button
          name="all"
          onClick={() => {
            setIsAllButton(true);
            setOrderProducts(basketProducts);
            openModal(basketProducts);
          }}
          className="bg-zinc-700 hover:bg-zinc-800"
        >
          전체상품주문
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="flex flex-row justify-between items-end">
          <div>결제 정보</div>
          <div className="text-xs text-zinc-600">* 필수입력사항</div>
        </div>
        <Modal.Header>
          <div className="flex flex-col border border-r-0 border-zinc-400 rounded-l-sm border-r-zinc-200">
            <div className="text-sm p-3 bg-zinc-100">총 상품금액</div>
            <div className="font-bold p-5">{totalPrice}</div>
          </div>
          <div className="flex flex-col border border-r-0 border-zinc-400 border-r-zinc-200 border-l-zinc-200">
            <div className="text-sm p-3 bg-zinc-100">총 배송비</div>
            <div className="font-bold p-5">{shippingFee}</div>
          </div>
          <div className="flex flex-col border border-zinc-400 rounded-r-sm border-l-zinc-200">
            <div className="text-sm p-3 bg-zinc-100">결제 예정 금액</div>
            <div className="font-bold p-5">{totalPrice! + shippingFee}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form {...form}>
            <FormLabel>주문자명 *</FormLabel>
            <FormField
              control={form.control}
              name="buyer_name"
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
            <FormLabel>우편번호 *</FormLabel>
            <FormField
              control={form.control}
              name="buyer_postcode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="w-24" {...field} maxLength={5} />
                  </FormControl>
                  <div className="hidden md:flex">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div />
            <FormLabel>주소 *</FormLabel>
            <FormField
              control={form.control}
              name="buyer_addr"
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
            <FormLabel>휴대전화 *</FormLabel>
            <FormField
              control={form.control}
              name="buyer_tel"
              render={({ field }) => (
                <FormItem>
                  <FormControl {...field}>
                    <Input {...field} />
                    {/* <Input
                        {...field}
                        type="text"
                        name="buyer_tel1"
                        defaultValue={"010"}
                        maxLength={3}
                      />
                      -
                      <Input {...field} type="text" name="buyer_tel2" maxLength={4} />
                      -
                      <Input {...field} type="text" name="buyer_tel3" maxLength={4} /> */}
                  </FormControl>
                  <div className="hidden md:flex">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div />
            <FormLabel>이메일 *</FormLabel>
            <FormField
              control={form.control}
              name="buyer_email"
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-2 items-center">
            <Checkbox id="terms" onCheckedChange={(checked) => setIsAgreedTerm(checked == true ? true : false)} />
            <div>쇼핑몰 이용약관 동의</div>
          </div>
          <div className="flex gap-4 w-full justify-center">
            <Modal.Close onClose={closeModal} />
            <PaymentButton fieldValues={form.getValues()} orderProducts={orderProducts} isAgreedTerm={isAgreedTerm} />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default PaymentFormModal;
