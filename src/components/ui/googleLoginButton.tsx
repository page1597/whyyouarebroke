import { MouseEventHandler, memo } from "react";

function GoogleLoginButton({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> | undefined }) {
  return (
    <button
      id="google_log_in"
      onClick={onClick}
      className="px-4 py-3 w-full flex text-sm justify-center gap-2 bg-zinc-200 text-zinc-600 rounded  hover:bg-zinc-300 transition duration-150"
    >
      <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google logo" />
      <span>구글 계정으로 로그인</span>
    </button>
  );
}
export default memo(GoogleLoginButton);
