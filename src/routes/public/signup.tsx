import SignUpForm from "@/components/signUpForm";
import { Helmet } from "react-helmet";

export default function SignUp() {
  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <h3 className="text-xl">회원가입</h3>
      <hr className="mt-5" />
      <div className="mt-8">
        <SignUpForm />
      </div>
    </>
  );
}
