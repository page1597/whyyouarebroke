import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUpForm from "../signUpForm";
import { BrowserRouter as Router } from "react-router-dom"; // BrowserRouter를 import 해야합니다.
import userEvent from "@testing-library/user-event";

// let mockSignUp = null;
// beforeEach(() => {
//   mockSignUp = jest.fn();
// });

test("폼 제출이 제대로 되는지 확인", async () => {
  const queryClient = new QueryClient(); // QueryClient 생성
  render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <SignUpForm />
      </QueryClientProvider>
    </Router>
  );

  //   const event = userEvent.setup();

  //   // 이메일과 비밀번호 입력란을 찾아서 값을 입력
  //   await event.type(screen.getByPlaceholderText("이메일 *"), "fake@example.com", { allAtOnce: true });
  //   await event.type(screen.getByPlaceholderText("비밀번호 *"), "iamfakepw!", { allAtOnce: true });
  //   await event.type(screen.getByPlaceholderText("비밀번호 확인 *"), "iamfakepw!", { allAtOnce: true });
  //   await event.type(screen.getByPlaceholderText("이름 *"), "가짜닉네임", { allAtOnce: true });

  //   // 로그인 버튼을 찾아 클릭
  //   const signUpButton = screen.getByRole("button", { name: "회원가입" });
  //   signUpButton.onclick = (e) => {
  //     e.preventDefault();
  //     mockSignUp({
  //       email: screen.getByPlaceholderText("이메일 *").value,
  //       password: screen.getByPlaceholderText("비밀번호 *").value,
  //       password_chcek: screen.getByPlaceholderText("비밀번호 확인 *").value,
  //       name: screen.getByPlaceholderText("이름 *").value,
  //     });
  //   };
  //   userEvent.click(signUpButton);

  //   // 로그인 함수가 호출되었는지 확인
  //   await waitFor(() => {
  //     expect(mockSignUp).toHaveBeenCalledWith({
  //       email: "fake@example.com",
  //       password: "iamfakepw!",
  //       password_chcek: "iamfakepw!",
  //       name: "가짜닉네임",
  //     });
  //   });
});
