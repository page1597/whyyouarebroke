import { fbGoogleSignUp, fbSignUp } from "@/services/firebase/user";
import { signUpFormSchema } from "@/types/formSchemas/signUp";
import { UserSignUpType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function useSignUp() {
  const navigate = useNavigate();
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

  const onSubmit = useCallback(
    (values: z.infer<typeof signUpFormSchema>) => {
      const user: UserSignUpType = {
        type: values.type,
        password: values.password,
        confirmPassword: values.confirmPassword,
        name: values.name,
        email: values.email,
      };
      fbSignUp(user, navigate);
    },
    [navigate]
  );

  const onGoogleSignUp = useCallback(() => {
    fbGoogleSignUp(navigate, form.getValues("type"));
  }, [navigate, form]);

  return { form, onSubmit, onGoogleSignUp };
}
