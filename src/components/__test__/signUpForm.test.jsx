import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpForm from "../signUpForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom"; // BrowserRouter를 import 해야합니다.
import { FormProvider } from "react-hook-form";
// import { FormProvider, Form } from "react-hook-form";
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockSignUp = jest.fn((email, password, passwordConfirm, name) => {
  return Promise.resolve({ email, password, passwordConfirm, name });
});

describe("signUpForm 테스트", () => {
  test("회원가입 버튼을 클릭했을 때 폼 제출이 제대로 되는지 확인", async () => {
    const queryClient = new QueryClient();
    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          {/* <FormProvider> */}
          <SignUpForm signUp={mockSignUp} />
          {/* </FormProvider> */}
        </QueryClientProvider>
      </Router>
    );
    fireEvent.input(screen.getByLabelText("이메일 *"), {
      target: {
        value: "fake@example.com",
      },
    });
    // fireEvent.input(screen.getByLabelText("비밀번호 *"), {
    //   target: {
    //     value: "iamfakepw!",
    //   },
    // });
    // fireEvent.input(screen.getByLabelText("비밀번호 확인 *"), {
    //   target: {
    //     value: "iamfakepw!",
    //   },
    // });
    // fireEvent.input(screen.getByLabelText("이름 *"), {
    //   target: {
    //     value: "가짜닉네임",
    //   },
    // });
    fireEvent.submit(screen.getByRole("button"));
    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(mockSignUp).toHaveBeenCalledWith("fake@example.com");
    // expect(await screen.findAllByDisplayValue("비밀번호가 다릅니다.")).toBe();
  });
});
