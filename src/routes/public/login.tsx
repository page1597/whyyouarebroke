import LogInForm from "@/components/logInForm";
import { memo } from "react";
import { Helmet } from "react-helmet";

function LogIn() {
  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <div className="flex flex-col items-center mt-36">
        <h3 className="text-2xl font-normal text-zinc-700 mb-10">회원 로그인</h3>
        <LogInForm />
      </div>
    </>
  );
}
export default memo(LogIn);
