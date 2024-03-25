import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Step2 from "../Step2";

describe("Step2 Component", () => {
  // Mock handleNext function

  const handleNextMock = jest.fn();

  // Mock useFormik hook
  jest.mock("formik", () => ({
    useFormik: jest.fn(() => ({
      handleSubmit: jest.fn(), // Mock handleSubmit function
      isValid: true,
      values: {},
      touched: {},
      errors: {},
      validateOnChange: false,
    })),
  }));

  beforeEach(() => {
    render(
      <>
        <Step2
          handleNext={handleNextMock}
          loading={false}
          submitLoading={false}
          stepsArray={[]}
          activeStep={0}
          handleBack={() => {}}
        />
      </>
    );
  });

  test("form renders without crashing", () => {
    const formElement = screen.getByTestId("step2-form");
    expect(formElement).toBeInTheDocument();
  });

  test("will render form validations if required fields are not filled", () => {
    const nextButton = screen.getByTestId("next-button");

    fireEvent.click(nextButton);
    const validation1 = screen.getByText("First name is required");
    const validation2 = screen.getByText("Last name is required");

    expect(validation1).toBeInTheDocument();
    expect(validation2).toBeInTheDocument();
  });

  test("will not show errors if all required fields are filled ", async () => {
    // Fill in form fields
    userEvent.type(screen.getByRole("textbox", { name: "First Name" }), "John");
    userEvent.type(screen.getByRole("textbox", { name: "Last Name" }), "Dee");

    const nextButton = screen.getByTestId("next-button");

    // // Submit the form
    userEvent.click(nextButton);

    const validation1 = screen.queryByText("First name is required");
    const validation2 = screen.queryByText("Last name is required");

    expect(validation1).not.toBeInTheDocument();
    expect(validation2).not.toBeInTheDocument();
  });
});
