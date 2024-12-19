import { fbSignUp } from "@/services/firebase/user";
import { signUpFormSchema } from "@/types/formSchemas/signUp";
import { UserSignUpType } from "@/types/user";
// import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useShowAlert from "../useShowAlert";

export default function useSignUp() {
  // const navigate = useNavigate();
  const { setShowAlert, showAlert, alertContent, setAlertContent } = useShowAlert();

  async function signUp(values: z.infer<typeof signUpFormSchema>) {
    const user: UserSignUpType = {
      type: values.type,
      password: values.password,
      confirmPassword: values.confirmPassword,
      name: values.name,
      email: values.email,
    };
    await fbSignUp(user);
    setAlertContent({ title: "회원가입", desc: "회원가입이 완료되었습니다.", nav: "/login" });
    setShowAlert(true);
  }

  // const onGoogleSignUp = useCallback(() => {
  //   fbGoogleSignUp(navigate, form.getValues("type"));
  // }, [navigate, form]);

  return { signUp, setShowAlert, showAlert, alertContent };
}
