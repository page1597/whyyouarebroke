export type UserInfoType = {
  email: string?;
  id: string?;
  name: string?;
  type: string?;
  // nickname: string;
  // image: string;
  // greeting: string;
};
// 회원가입 폼 타입
export type UserSignUpType = {
  type: string;
  // id: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  // nickname: string;
  // image: string;
  // greeting: string;
};
