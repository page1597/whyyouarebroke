// 관리자 확인
export const useAuthenticateAdmin = (): boolean => {
  // 여기서 React-Query를 이용해 서버로부터 data fetching 수행
  // 관리자인지 판매자인지 확인
  const isAdmin = false; // 판매자(관리자)인지 확인

  return isAdmin;
};

// 로그인 확인
export const useAuthenticateUser = (): boolean => {
  // 여기서 React-Query를 이용해 서버로부터 data fetching 수행
  const isUserLoggedIn = false; // 로그인 확인

  return isUserLoggedIn;
};
