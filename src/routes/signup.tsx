import SignUpForm from "@/components/ui/signUpForm";

export default function SignUp() {
  return (
    <div>
      <h3 className="text-xl">회원가입</h3>
      <div className="mt-8">
        <SignUpForm />
      </div>
    </div>
  );
}
