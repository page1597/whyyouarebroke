import { fbLogOut } from "@/services/firebase/user";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import useShowAlert from "../useShowAlert";

function useLogOutMutation() {
  const { setShowAlert, showAlert, setAlertContent, alertContent } = useShowAlert();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["log out"], // Query Key
    mutationFn: () => fbLogOut(), // 비동기 작업을 수행하는 함수
    onSuccess: () => {
      setShowAlert(true);
      setAlertContent({ title: "로그아웃", desc: "로그아웃 하였습니다.", nav: "/" });
    },
    onError: () => {
      setShowAlert(true);
      setAlertContent({ title: "로그아웃", desc: "로그아웃 하지 못했습니다.", nav: null });
    },
  });
  const logOut = useCallback(() => {
    mutate();
  }, [mutate]);

  return { logOut, isPending, isError, showAlert, setShowAlert, alertContent };
}
export default useLogOutMutation;
