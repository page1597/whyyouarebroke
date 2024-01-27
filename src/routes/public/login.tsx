import LogInForm from "@/components/logInForm";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-36">
      <h3 className="text-2xl font-normal text-zinc-700 mb-10">회원 로그인</h3>
      <LogInForm navigate={navigate} />
    </div>
  );
}
