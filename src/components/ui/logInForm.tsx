import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { logIn } from "@/firebase";
import { NavigateFunction } from "react-router-dom";
import { LoginSocialGoogle, IResolveParams } from "reactjs-social-login";
import { useCallback, useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
const formSchema = z.object({
  id: z.string().min(2, {
    message: "id must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});
// ^(?!.*(1234|5678|password|admin|qwerty|abcd|12345|98765|55555|11111|66666|00000|4321|8765|user|root|login|letmein|asdfgh|qwertyuiop|zxcvbnm|123qwe)).*(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*\d){1,})(?=(.*[\W_]){1,})[A-Za-z\d\W_]{10,}$
export default function LogInForm({ navigate }: { navigate: NavigateFunction }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
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
    logIn(values.id, values.password, navigate);
  }

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>id</FormLabel> */}
              <FormControl>
                <Input placeholder="아이디" {...field} />
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
      {/* <LoginSocialGoogle
        isOnlyGetToken
        client_id={process.env.REACT_APP_GG_APP_ID || ""}
        onLoginStart={onLoginStart}
        // onResolve={({ provider, data }: IResolveParams) => {
        //   setProvider(provider);
        //   setProfile(data);
        // }}
        onReject={(err: any) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle> */}
    </Form>
  );
}
