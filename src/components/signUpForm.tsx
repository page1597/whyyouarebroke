// import { Button } from "@/components/ui/button";
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@radix-ui/react-label";
// import GoogleSignUpButton from "./ui/googleSignupButton";
import { signUpFormSchema } from "@/types/formSchemas/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
// import { FormField, FormItem, FormControl, FormMessage } from "./ui/form";
// import { Input } from "./ui/input";
// import { signUpFormSchema } from "@/types/formSchemas/signUp";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
export default function SignUpForm({ signUp }: { signUp: any }) {
  // useSignUp과 useForm 분리
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      type: "일반 회원",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
    },
  });
  const { handleSubmit, register } = useForm();

  async function onSubmit(data: any) {
    console.log(data);
    await signUp(data.email);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 소셜 로그인 - 구글 */}
          <div className="text-zinc-700 md:mb-3 mb-2 md:text-base text-sm">SNS 계정으로 회원가입</div>
          {/* <GoogleSignUpButton onClick={onGoogleSignUp} /> */}
          <div className="flex mt-10 flex-row justify-between items-end">
            <div>기본정보</div>
            <div className="text-xs  text-zinc-600">* 필수입력사항</div>
          </div>
          <div className="hidden md:grid md:grid-cols-102 gap-4 border border-zinc-300 rounded p-8 mt-3">
            <label htmlFor="email" className="flex items-center">
              이메일 *
            </label>
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-202">
                    <FormControl>
                      <Input id="email" {...field} />
                    </FormControl>
                    <div className="hidden md:flex">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            /> */}

            <input
              id="email"
              {...register("email", {
                required: "required",
              })}
              type="email"
            />
          </div>

          <div className="flex w-full justify-center">
            <button id="sign_up" type="submit" className="mt-6 w-32 bg-zinc-700 hover:bg-zinc-800">
              회원가입
            </button>
          </div>
        </form>
      </Form>
    </>
  );
}
