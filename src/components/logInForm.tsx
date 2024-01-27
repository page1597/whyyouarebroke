import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { googleLogIn, logIn } from "@/services/firebase";
import { NavigateFunction } from "react-router-dom";
import GoogleLoginButton from "./ui/googleLoginButton";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export default function LogInForm({ navigate }: { navigate: NavigateFunction }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    logIn(values.email, values.password, navigate);
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center w-96">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
          <div className="flex flex-row w-full">
            <div className="flex flex-col justify-between h-20 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="이메일" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="비밀번호" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="ml-2 h-full w-36" type="submit">
              로그인
            </Button>
          </div>
        </form>
        <div className="w-full flex flex-col justify-center items-center mt-14">
          <div className="text-zinc-500 mb-5">소셜 로그인</div>
          <GoogleLoginButton onClick={() => googleLogIn(navigate)} />
        </div>
      </div>
    </Form>
  );
}
