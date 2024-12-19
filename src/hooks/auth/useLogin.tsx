import { useCallback } from "react";
import useShowAlert from "../useShowAlert";
import { useMutation } from "@tanstack/react-query";
import { fbLogIn } from "@/services/firebase/user";

export default function useLogIn() {
  const { setShowAlert, showAlert, alertContent, setAlertContent } = useShowAlert();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["log in"],
    mutationFn: ({ email, password }: { email: string; password: string }) => fbLogIn(email, password), // 비동기 작업을 수행하는 함수
    onSuccess: () => {},
    onError: () => {
      setAlertContent({ title: "로그인", desc: "이메일이나 비밀번호를 다시 한 번 확인해 주세요.", nav: null });
      setShowAlert(true);
    },
  });

  const logIn = useCallback(({ email, password }: { email: string; password: string }) => {
    mutate({ email, password });
  }, []);

  return { logIn, isPending, isError, setShowAlert, showAlert, alertContent };
}
