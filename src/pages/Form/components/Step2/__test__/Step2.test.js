import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  within,
  act,
} from "@testing-library/react";
import { useFormik } from "formik";
import userEvent from "@testing-library/user-event";
import Step2 from "../Step2";

describe("Step1 Component", () => {
  // Mock handleNext function
  const handleNext = jest.fn();
  const handleNextClick = jest.fn();

  // Mock useFormik hook
  jest.mock("formik", () => ({
    useFormik: jest.fn(() => ({
      handleSubmit: jest.fn(), // Mock handleSubmit function
      isValid: true,
      initialValues: {},
      onSubmit: jest.fn(), // Mock onSubmit function
      touched: {},
      errors: {},
      validateOnChange: false,
    })),
  }));

  beforeEach(() => {
    render(<Step2 handleNext={handleNext} />);
  });

  test("form renders without crashing", () => {
    const formElement = screen.getByTestId("step2-form");
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

  test("rendering and submitting a basic Formik form", async () => {
    // Fill in form fields
    userEvent.type(screen.getByRole("textbox", { name: "First Name" }), "John");
    userEvent.type(screen.getByRole("textbox", { name: "Last Name" }), "Dee");

    // Check the checkboxes
    userEvent.click(
      screen.getByLabelText("I certify the presented information is correct")
    );
    userEvent.click(
      screen.getByLabelText("Do you want to recieve promotion emails")
    );

    const nextButton = screen.getByTestId("next-button");

    // Submit the form
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(handleNext).toHaveBeenCalled();
    });
  });
});
