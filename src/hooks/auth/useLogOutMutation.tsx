import { fbLogOut } from "@/services/firebase/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useLogOutMutation() {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["log out"], // Query Key
    mutationFn: () => fbLogOut(), // 비동기 작업을 수행하는 함수
    onSuccess: () => {
      console.log("로그아웃 성공");
      alert("로그아웃 하였습니다.");
      navigate("/"); // navigate 함수의 사용을 위해 해당 부분을 조정해야 합니다.
    },
    onError: (error) => {
      console.error("로그아웃 실패", error);
      alert("로그아웃하지 못했습니다.");
    },
  });
  return { logOut: mutate, isPending, isError };
}
