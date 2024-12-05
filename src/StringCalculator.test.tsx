import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "./StringCalculator";

describe("String Calculator", () => {
  const validator = (inputString: string, result: string) => {
    render(<StringCalculator />);
    const input = screen.getByTestId("input-box");
    const button = screen.getByTestId("calculate-button");

    fireEvent.change(input, { target: { value: inputString } });
    fireEvent.click(button);
    expect(screen.getByTestId("result-message")).toHaveTextContent(result);
  };

  test("renders input, button, and result area", () => {
    render(<StringCalculator />);
    expect(screen.getByTestId("input-box")).toBeInTheDocument();
    expect(screen.getByTestId("calculate-button")).toBeInTheDocument();
  });

  test("should shows 0 for empty input", () => {
    validator("", "Result: 0");
  });

  test("should calculates sum for multiple numbers", () => {
    validator("1,2,3", "Result: 6");
  });

  test("should handle newlines as delimiters", () => {
    validator("1\\n2,3", "Result: 6");
  });

  test("should handle custom delimiters", () => {
    validator("//;\\n1;2;3", "Result: 6");
  });
});
