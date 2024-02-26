import { MouseEventHandler, memo } from "react";

function GoogleSignUpButton({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> | undefined }) {
  return (
    <button
      id="google_sign_up"
      onClick={onClick}
      className="px-4 py-2 flex text-sm justify-center gap-2 border border-zinc-400 rounded"
    >
      <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google logo" />
      <span>구글 계정으로 회원가입</span>
    </button>
  );
}
export default memo(GoogleSignUpButton);
