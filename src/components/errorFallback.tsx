import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-3 text-zinc-900">
      <AlertCircle width={50} height={50} />
      <h2 className="text-xl md:text-2xl text-center">{error.message}</h2>
      <hr />
      <div className="text-zinc-700">
        <Button id="back_to_main" className="bg-zinc-700 hover:bg-zinc-800" onClick={resetErrorBoundary}>
          메인 화면으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
