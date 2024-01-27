import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/formInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { googleSignUp, signUp } from "@/firebase";
import { NavigateFunction } from "react-router-dom";
import { UserSignUpType } from "@/types";
import GoogleLoginButton from "./googleLoginButton";

const passwordRegx = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?()_+~-]).{8,15}$/;
const easyStringRegex =
  /^(?!.*(123|abc|admin|password|qwerty|letmein|welcome|monkey|12345|123456|654321|11111|123123|admin123|password123|test|pass|login|letme|welcome1|admin1234|admin@123))/;

const strongPasswordRegex = new RegExp(`${easyStringRegex.source}${passwordRegx.source}`);

const formSchema = z
  .object({
    type: z.string(),
    // id: z.string().regex(idRegx, "영문 소문자 / 숫자 (4자~16자)로 입력해주세요."),
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
      type: "",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <GoogleLoginButton onClick={() => googleSignUp(navigate, form.getValues("type"))} type="회원가입" />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일 *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel>회원 구분 *</FormLabel>
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 *</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage>영문 대소문자 / 숫자 / 특수문자 중 3가지 이상 조합 (8자~16자)</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인 *</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름 *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">회원가입</Button>
      </form>
    </Form>
  );
}
