import { fbLogIn } from "@/services/firebase/user";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import useShowAlert from "../useShowAlert";
function useLogInMutation() {
  const { setShowAlert, showAlert, alertContent } = useShowAlert();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["log in"],
    mutationFn: ({ email, password }: { email: string; password: string }) => fbLogIn(email, password), // 비동기 작업을 수행하는 함수
    onSuccess: () => {
      // setAlertContent({ title: "로그인", desc: "로그인 되었습니다.", nav: "/" });
      // setShowAlert(true);
      alert("로그인 되었습니다.");
    },
    onError: (error) => {
      alert("이메일과 비밀번호를 다시 한 번 확인해 주세요.");
      console.error("로그인 실패", error);
      // setAlertContent({ title: "로그인", desc: "이메일과 비밀번호를 다시 한 번 확인해 주세요.", nav: null });
      // setShowAlert(true);
    },
  });

  const logIn = useCallback(({ email, password }: { email: string; password: string }) => {
    mutate({ email, password });
  }, []);

  return { logIn, isPending, isError, setShowAlert, showAlert, alertContent };
}
export default useLogInMutation;
