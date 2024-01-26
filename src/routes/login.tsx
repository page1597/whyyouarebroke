import LogInForm from "@/components/ui/logInForm";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();
return (
    <div>
      <h3 className="text-xl">회원 로그인</h3>
      <LogInForm navigate={navigate} />
    </div>
  );
}
