import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/formInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { signUp } from "@/firebase";
import { NavigateFunction } from "react-router-dom";
import { UserSignUpType } from "@/types";

// var passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
const idRegx = RegExp(/^[a-zA-Z][0-9a-zA-Z]{3,15}$/);
const passwordRegx = RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,15}$/);

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z
  .object({
    // id: z.string().min(4, { message: "영문 소문자 / 숫자 (4자~16자)으로 입력해주세요." }).max(16, {
    //   message: "영문 소문자 / 숫자 (4자~16자)으로 입력해주세요.",
    // }),
    type: z.string(),
    id: z.string().regex(idRegx, "영문 소문자 / 숫자 (4자~16자)로 입력해주세요."),
    // password: z.string().min(8).max(16, {
    //   message: "영문 대소문자 / 숫자 / 특수문자 중 3가지 이상 조합 (8자~16자)으로 입력해주세요.",
    // }),
    password: z
      .string()
      .regex(passwordRegx, "영문 대소문자 / 숫자 / 특수문자 중 3가지 이상 조합 (8자~16자)으로 입력해주세요."),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(2, {
        message: "이름을 입력해주세요.",
      })
      .max(16, {
        message: "이름을 16자 이하로 입력해주세요.",
      }),
    // nickname: z
    //   .string()
    //   .min(2, {
    //     message: "닉네임을 입력해주세요.",
    //   })
    //   .max(16, {
    //     message: "닉네임을 16자 이하로 입력해주세요.",
    //   }),
    // image: z
    //   .any()
    //   .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    //   .refine(
    //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //     "Only .jpg, .jpeg, .png and .webp formats are supported."
    //   ),
    // image: z.any(),
    // greeting: z.string(),
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
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      id: "",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
      //   nickname: "",
      //   image: "",
      //   greeting: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const user: UserSignUpType = {
      type: values.type,
      id: values.id,
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
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아이디 *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage>영문 소문자 / 숫자 (4자~16자)</FormMessage>
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
        {/* <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임 *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이미지 *</FormLabel>
              <FormControl>
                <div>
                  <input
                    {...field}
                    id="profile"
                    type="file"
                    className="text-sm file:mr-2 file:bg-zinc-400 file:py-1 file:px-2 file:text-sm file:cursor-pointer file:outline-none file:border-none file:text-white hover:file:bg-zinc-500 hover:cursor-pointer focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="greeting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>인사말 *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="휴대폰" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">회원가입</Button>
      </form>
    </Form>
  );
}
