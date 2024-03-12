import { useNavigate } from "react-router-dom";
import logo from "src/assets/logo.webp";

export default function Logo({ width, height, className }: { width: number; height: number; className?: string }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} className={`cursor-pointer ${className}`}>
      <img id="logo" src={logo} width={width} height={height} alt={"logo"} />
    </div>
  );
}
