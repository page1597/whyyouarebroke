import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { googleLogIn, logIn } from "@/firebase";
import { NavigateFunction } from "react-router-dom";
import { LoginSocialGoogle, IResolveParams } from "reactjs-social-login";
import { useCallback, useState } from "react";
import GoogleLoginButton from "./googleLoginButton";
// import GoogleLoginButton from "./googleLoginButton";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export default function LogInForm({ navigate }: { navigate: NavigateFunction }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const { auth } = useAuthTest();
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // const { auth, setAuth } = useContext(AuthContext);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // const user: { email: string; password: string } = {
    //   email: values.id, // 아이디 입력되면 이메일 가져와서 넣을 수 있게 하기
    //   password: values.password,
    // };
    logIn(values.email, values.password, navigate);
  }

  // const [provider, setProvider] = useState("");
  // const [profile, setProfile] = useState<any>();

  // const onLoginStart = useCallback(() => {
  //   alert("login start");
  // }, []);

  // const onLogoutSuccess = useCallback(() => {
  //   setProfile(null);
  //   setProvider("");
  //   alert("logout success");
  // }, []);
  const provider = new GoogleAuthProvider();
  const onLogout = useCallback(() => {}, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="이메일" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
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
        <Button type="submit">로그인</Button>
      </form>
      {/* <LoginSocialGoogle>
        <GoogleLoginButton />
      </LoginSocialGoogle> */}
      {/* <LoginSocialGoogle
        isOnlyGetToken
        client_id="732913480632-ui7vn8sq17ibsmnjasmnpke710sdmiod.apps.googleusercontent.com"
        onLoginStart={onLoginStart}
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err: any) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle> */}
      {/* <GoogleLoginButton onClick={googleLogIn}>구글 로그인</GoogleLoginButton> */}
    </Form>
  );
}
