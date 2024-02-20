import SignUpForm from "@/components/signUpForm";
import { Helmet } from "react-helmet";

export default function SignUp() {
  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <h3 className="md:text-xl text-lg">회원가입</h3>
      <hr className="md:mt-5 mt-3" />
      <div className="md:mt-8 mt-5">
        <SignUpForm />
      </div>
    </>
  );
}
