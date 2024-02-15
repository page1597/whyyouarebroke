import { useContext, useState } from "react";
import Modal from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "./ui/formInput";
import { Checkbox } from "@/components/ui/checkbox";
import PaymentButton from "./paymentButton";
import { AuthContext } from "@/context/authContext";
import { Button } from "./ui/button";
import { BasketProductType } from "@/types/product";
import useOrderModal from "@/hooks/order/useOrderModal";

// 모달창 직접 구현
function PaymentFormModal({
  checkedProducts,
  basketProducts,
}: {
  checkedProducts: BasketProductType[];
  basketProducts: BasketProductType[];
}) {
  const userInfo = useContext(AuthContext);
  const [isAgreedTerm, setIsAgreedTerm] = useState(false);
  const shippingFee = 3000;

  const { form, isOpen, onClose, orderProducts, orderSelectedProducts, orderAllProducts, totalPrice } = useOrderModal(
    userInfo,
    checkedProducts,
    basketProducts
  );

  return (
    <div>
      <div className="flex justify-center gap-5 mt-12">
        <Button
          id="selected"
          name="selected"
          onClick={orderSelectedProducts}
          className="bg-white border text-zinc-800 border-zinc-800 hover:bg-zinc-100"
        >
          선택상품주문
        </Button>
        <Button id="null" name="all" onClick={orderAllProducts} className="bg-zinc-700 hover:bg-zinc-800">
          전체상품주문
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
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
            <Modal.Close onClose={onClose} /> {/* 모달 창 닫음 */}
            <PaymentButton
              fieldValues={form.getValues()}
              orderProducts={orderProducts}
              isAgreedTerm={isAgreedTerm}
              setIsAgreedTerm={setIsAgreedTerm}
              userId={userInfo?.id === undefined || userInfo?.id === null ? null : userInfo.id}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default PaymentFormModal;
