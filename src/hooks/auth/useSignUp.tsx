import { fbSignUp } from "@/services/firebase/user";
import { signUpFormSchema } from "@/types/formSchemas/signUp";
import { UserSignUpType } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function useSignUp() {
  const navigate = useNavigate();
  //     name: "",

  // 회원가입 폼 제출
  async function signUp(values: z.infer<typeof signUpFormSchema>) {
    const user: UserSignUpType = {
      type: values.type,
      password: values.password,
      confirmPassword: values.confirmPassword,
      name: values.name,
      email: values.email,
    };

    // firebase 통신 수행
    await fbSignUp(user, navigate);
  }

  // const onGoogleSignUp = useCallback(() => {
  //   fbGoogleSignUp(navigate, form.getValues("type"));
  // }, [navigate, form]);

  return { signUp };
}
