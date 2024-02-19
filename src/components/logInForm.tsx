import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleLoginButton from "./ui/googleLoginButton";
import { fbGoogleLogIn } from "@/services/firebase/user";
import useLogInMutation from "@/hooks/auth/useLogInMutation";
import useLogIn from "@/hooks/auth/useLogin";
import Alert from "./alert";

export default function LogInForm() {
  const { logIn, isPending, showAlert, setShowAlert, alertContent } = useLogInMutation();
  const { onSubmit, form } = useLogIn(logIn);

  return (
    <>
      <Alert setShowAlert={setShowAlert} showAlert={showAlert} alertContent={alertContent} />
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
                        <Input type="password" placeholder="비밀번호" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button id="log_in" className="ml-2 h-full w-36" type="submit" disabled={isPending}>
                로그인
              </Button>
            </div>
          </form>

          <div className="w-full flex flex-col justify-center items-center mt-14">
            <div className="text-zinc-500 mb-5">소셜 로그인</div>
            <GoogleLoginButton onClick={() => fbGoogleLogIn()} />
          </div>
        </div>
      </Form>
    </>
  );
}
