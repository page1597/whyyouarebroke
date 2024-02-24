import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

it("should not display error when value is valid", async () => {
  render(<App login={mockLogin} />);

  fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
    target: {
      value: "test@mail.com",
    },
  });

  fireEvent.input(screen.getByLabelText("password"), {
    target: {
      value: "password",
    },
  });

  fireEvent.submit(screen.getByRole("button"));

  await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
  expect(mockLogin).toBeCalledWith("test@mail.com", "password");
  expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue("");
  expect(screen.getByLabelText("password")).toHaveValue("");
});
