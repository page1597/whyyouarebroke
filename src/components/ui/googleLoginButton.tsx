import { MouseEventHandler } from "react";

export default function GoogleLoginButton({
  onClick,
  type,
}: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  type: string;
}) {
  return (
    <div className="flex items-center dark:bg-gray-800">
      <button
        onClick={onClick}
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>구글 계정으로 {type}하기</span>
      </button>
    </div>
  );
}
