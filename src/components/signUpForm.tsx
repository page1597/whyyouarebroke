import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/formInput";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { googleSignUp, signUp } from "@/services/firebase";
import { NavigateFunction } from "react-router-dom";
import { UserSignUpType } from "@/types";
import GoogleSignUpButton from "./ui/googleSignupButton";

const passwordRegx = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?()_+~-]).{8,15}$/;
const easyStringRegex =
  /^(?!.*(123|abc|admin|password|qwerty|letmein|welcome|monkey|12345|123456|654321|11111|123123|admin123|password123|test|pass|login|letme|welcome1|admin1234|admin@123))/;

const strongPasswordRegex = new RegExp(`${easyStringRegex.source}${passwordRegx.source}`);

const formSchema = z
  .object({
    type: z.string(),
    password: z
      .string()
      .regex(passwordRegx, "영문 대소문자 / 숫자 / 특수문자 중 3가지 이상 조합 (8자~16자)으로 입력해주세요.")
      .regex(easyStringRegex, "일련번호, 잘 알려진 단어, 키보드 상 나란히 있는 문자를 제외해주세요."),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(2, {
        message: "이름을 입력해주세요.",
      })
      .max(16, {
        message: "이름을 16자 이하로 입력해주세요.",
      }),
    email: z.string().email({
      message: "올바른 이메일 형식이 아닙니다.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      console.log("비밀번호 다름");
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 다릅니다.",
        path: ["confirmPassword"],
      });
    }
  });

export default function SignUpForm({ navigate }: { navigate: NavigateFunction }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "일반 회원",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // forbiddenWords.push(values.id);
    console.log(values);
    const user: UserSignUpType = {
      type: values.type,
      password: values.password,
      confirmPassword: values.confirmPassword,
      name: values.name,
      email: values.email,
    };
    signUp(user, navigate);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* 소셜 로그인 - 구글 */}
          <div className="text-zinc-700 mb-3">SNS 계정으로 회원가입</div>
          <GoogleSignUpButton onClick={() => googleSignUp(navigate, form.getValues("type"))} />
          <div className="flex mt-10 flex-row justify-between items-end">
            <div>기본정보</div>
            <div className="text-xs  text-zinc-600">* 필수입력사항</div>
          </div>
          <div className="hidden md:grid grid-cols-102 gap-4 border border-zinc-300 rounded p-8 mt-3">
            <FormLabel>이메일 *</FormLabel>

            <FormField
              control={form.control}
              name="email"
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
            <FormLabel>회원 구분 *</FormLabel>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem {...field}>
                  <div className="grid grid-cols-202">
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
                  </div>
                </FormItem>
              )}
            />

            <FormLabel>비밀번호 *</FormLabel>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage>영문 대소문자 / 숫자 / 특수문자 중 3가지 이상 조합 (8자~16자)</FormMessage>
                    </div>
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
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
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
                      <Input {...field} className="w-56" />
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
              회원가입
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
