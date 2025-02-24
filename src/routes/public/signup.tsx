import Alert from "@/components/customUI/alert";
import SignUpForm from "@/components/form/signUpForm";
import useSignUp from "@/hooks/auth/useSignUp";
import { Helmet } from "react-helmet";

export default function SignUp() {
  const { setShowAlert, showAlert, alertContent, signUp } = useSignUp();

  return (
    <>
      <Alert setShowAlert={setShowAlert} showAlert={showAlert} alertContent={alertContent} />

      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <h3 className="md:text-xl text-lg">회원가입</h3>
      <hr className="md:mt-5 mt-3" />
      <div className="md:mt-8 mt-5">
        <SignUpForm signUp={signUp} />
      </div>
    </>
  );
}
