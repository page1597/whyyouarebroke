import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpForm from "../signUpForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom"; // BrowserRouter를 import 해야합니다.
import userEvent from "@testing-library/user-event";
// import { FormProvider, Form } from "react-hook-form";
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockSignUp = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});
describe("signUpForm 테스트", () => {
  test("회원가입 버튼을 클릭했을 때 폼 제출이 제대로 되는지 확인", async () => {
    const queryClient = new QueryClient();
    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <SignUpForm signUp={mockSignUp} />
        </QueryClientProvider>
      </Router>
    );

    // await userEvent.type(screen.getByLabelText("이메일 *"), "fake@example.com", { allAtOnce: true });
    // await userEvent.type(screen.getByLabelText("비밀번호 *"), "qlalf!234", { allAtOnce: true });
    const emailInput = screen.getByLabelText("이메일 *");
    const passwordInput = screen.getByLabelText("비밀번호 *");

    await form.control.setValue("email", "fake@example.com");
    await form.control.setValue("password", "qlalf!234");
    expect(emailInput.value).toBe("fake@example.com");
    expect(passwordInput.value).toBe("qlalf!234");

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(mockSignUp).toHaveBeenCalledWith("fake@example.com", "qlalf!234"));
  });
});
