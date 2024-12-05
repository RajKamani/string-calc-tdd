import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "./StringCalculator";

describe("String Calculator", () => {
  test("renders input, button, and result area", () => {
    render(<StringCalculator />);
    expect(screen.getByTestId("input-box")).toBeInTheDocument();
    expect(screen.getByTestId("calculate-button")).toBeInTheDocument();
  });

  test("shows 0 for empty input", () => {
    render(<StringCalculator />);
    const input = screen.getByTestId("input-box");
    const button = screen.getByTestId("calculate-button");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(screen.getByTestId("result-message")).toHaveTextContent("Result: 0");
  });
});
