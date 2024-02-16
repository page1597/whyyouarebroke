import { logInFormSchema } from "@/types/formSchemas/logIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function useLogIn(logIn: any) {
  const onSubmit = useCallback((values: z.infer<typeof logInFormSchema>) => {
    logIn(values);
  }, []);

  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return { onSubmit, form };
}
export default useLogIn;
