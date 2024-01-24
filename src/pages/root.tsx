// import Header from "src/components/Header";

import { Outlet } from "react-router-dom";
export default function Root() {
  return (
    <>
      <Outlet />
    </>
  );
}
