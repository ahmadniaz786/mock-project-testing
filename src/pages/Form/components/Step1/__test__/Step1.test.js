import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Step1 from "../Step1";

describe("Step1 Component", () => {
  beforeEach(() => {
    render(<Step1 handleNext={() => {}} />);
  });

  test("form renders without crashing", () => {
    const formElement = screen.getByTestId("step1-form");
    expect(formElement).toBeInTheDocument();
  });

  test("form renders validations", () => {
    const nextButton = screen.getByTestId("next-button");

    fireEvent.click(nextButton);
    const validation1 = screen.getByText("First name is required");
    const validation2 = screen.getByText("Last name is required");
    expect(validation1).toBeInTheDocument();
    expect(validation2).toBeInTheDocument();
  });
});
