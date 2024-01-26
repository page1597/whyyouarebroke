import SignUpForm from "@/components/ui/signUpForm";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="text-xl">회원가입</h3>
      <div className="mt-8">
        <SignUpForm navigate={navigate} />
      </div>
    </div>
  );
}
