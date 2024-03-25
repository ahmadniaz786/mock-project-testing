import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Step1 from "../Step1";

describe("Step1 Component", () => {
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
        <Step1
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
    const formElement = screen.getByTestId("step1-form");
    expect(formElement).toBeInTheDocument();
  });

  test("will render form validations if required fields are not filled", () => {
    const nextButton = screen.getByTestId("next-button");

    fireEvent.click(nextButton);
    const validation1 = screen.getByText("First name is required");
    const validation2 = screen.getByText("Last name is required");
    const validation3 = screen.getByText("must select a country");
    const validation4 = screen.getByText("must select a degree");
    expect(validation1).toBeInTheDocument();
    expect(validation2).toBeInTheDocument();
    expect(validation3).toBeInTheDocument();
    expect(validation4).toBeInTheDocument();
  });

  test("will not show errors if all required fields are filled ", async () => {
    // Fill in form fields
    userEvent.type(screen.getByRole("textbox", { name: "First Name" }), "John");
    userEvent.type(screen.getByRole("textbox", { name: "Last Name" }), "Dee");

    // Open and select options from dropdowns
    userEvent.click(screen.getByRole("combobox", { name: "Country" }));
    const option1 = await screen.findByRole("option", { name: "Pakistan" });
    userEvent.click(option1);

    // Open and select options from dropdowns
    userEvent.click(screen.getByRole("combobox", { name: "Degree" }));
    const option2 = await screen.findByRole("option", { name: "Master" });
    userEvent.click(option2);

    const nextButton = screen.getByTestId("next-button");

    // // Submit the form
    userEvent.click(nextButton);

    const validation1 = screen.queryByText("First name is required");
    const validation2 = screen.queryByText("Last name is required");
    const validation3 = screen.queryByText("must select a country");
    const validation4 = screen.queryByText("must select a degree");

    expect(validation1).not.toBeInTheDocument();
    expect(validation2).not.toBeInTheDocument();
    expect(validation3).not.toBeInTheDocument();
    expect(validation4).not.toBeInTheDocument();
  });
});
