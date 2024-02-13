import { fbLogIn } from "@/services/firebase/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useLogInMutation() {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["log in"], // Query Key
    mutationFn: ({ email, password }: { email: string; password: string }) => fbLogIn(email, password), // 비동기 작업을 수행하는 함수
    onSuccess: (data) => {
      console.log("로그인 성공", data);
      alert("로그인 되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패", error);
      alert("이메일과 비밀번호를 다시 한 번 확인해 주세요.");
    },
  });
  return { logIn: mutate, isPending, isError };
}
