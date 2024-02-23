import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom"; // BrowserRouter를 import 해야합니다.
import userEvent from "@testing-library/user-event";
import * as useSignUpModule from "../../hooks/auth/useSignUp";
import { FormProvider } from "react-hook-form";
import SignUpForm from "../signUpForm";

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// jest.mock("../../hooks/auth/useSignUp");
// jest.mock("../../hooks/auth/useSignUp", () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

// jest.mock("../../hooks/auth/useSignUp", () => ({
//   __esModule: true,
//   default: () => ({
//     form: {
//       handleSubmit: jest.fn((callback) => callback()),
//       control: {},
//       getValues: jest.fn(),
//     },
//     onSubmit: jest.fn(),
//     onGoogleSignUp: jest.fn(),
//   }),
// }));
// jest.mock("react-hook-form", () => ({
//   __esModule: true,
//   useForm: jest.fn(() => ({
//     handleSubmit: jest.fn(),
//     control: {},
//     getValues: jest.fn(),
//     formState: {},
//   })),
// }));

jest.mock("../../hooks/auth/useSignUp", () => ({
  __esModule: true,
  default: () => ({
    form: {},
    onSubmit: jest.fn(),
    onGoogleSignUp: jest.fn(),
  }),
}));

describe("signUpForm 테스트", () => {
  test("회원가입 버튼을 클릭했을 때 폼 제출이 제대로 되는지 확인", async () => {
    const queryClient = new QueryClient();

    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <SignUpForm />
        </QueryClientProvider>
      </Router>
    );

    // 인풋 창에 입력
    await userEvent.type(screen.getByLabelText("이메일 *"), "fake@example.com", { allAtOnce: true });
    await userEvent.type(screen.getByLabelText("비밀번호 *"), "iamfakepw!", { allAtOnce: true });
    await userEvent.type(screen.getByLabelText("비밀번호 확인 *"), "iamfakepw!", { allAtOnce: true });
    await userEvent.type(screen.getByLabelText("이름 *"), "가짜닉네임", { allAtOnce: true });

    // 버튼 클릭
    userEvent.click(screen.getByRole("button", { name: "회원가입" }));

    // 로그인 함수가 호출되었는지 확인
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
