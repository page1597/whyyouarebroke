import SignUpForm from "@/components/signUpForm";

function SignUp() {
  return (
    <div>
      <h3 className="text-xl">회원가입</h3>
      <hr className="mt-5" />
      <div className="mt-8">
        <SignUpForm />
      </div>
    </div>
  );
}
export default SignUp;
