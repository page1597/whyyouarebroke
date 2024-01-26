import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  // 로그인임 사실
  var isLoggedIn = false;
  // TODO: Use authentication token
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn = true;
    }
  });
  console.log("useAuth isLoggedIn", isLoggedIn);
  console.log;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoutes;
