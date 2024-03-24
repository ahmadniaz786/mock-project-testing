import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  within,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step1 from "../Step1";

describe("Step1 Component", () => {
  const handleNext = jest.fn();
  const handleNextClick = jest.fn();
  // Mock handleNext function

  // Mock useFormik hook
  jest.mock("formik", () => ({
    useFormik: jest.fn(() => ({
      handleSubmit: jest.fn(),
      isValid: true, // Mock the isValid property to return true
      values: {}, // You may need to add values if your form relies on them
    })),
  }));

  beforeEach(() => {
    render(<Step1 handleNext={handleNext} />);
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

  test("rendering and submitting a basic Formik form", async () => {
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

    // Submit the form
    userEvent.click(screen.getByTestId("next-button"));

    // Assert that handleNextMock has been called
    await waitFor(() => expect(handleNext).toHaveBeenCalled());
  });

  // test("rendering and submitting a basic Formik form", async () => {
  //   const user = userEvent.setup();

  //   await user.type(
  //     screen.getByRole("textbox", { name: "First Name" }),
  //     "John"
  //   );
  //   await user.type(screen.getByRole("textbox", { name: "Last Name" }), "Dee");

  //   const dropdown1 = screen.getByRole("combobox", { name: "Country" });
  //   user.selectOptions(
  //     dropdown1,
  //     within(dropdown1).getByRole("option", { name: "Pakistan" })
  //   );

  //   const dropdown2 = screen.getByRole("combobox", { name: "Degree" });
  //   user.selectOptions(
  //     dropdown2,
  //     within(dropdown2).getByRole("option", { name: "Master" })
  //   );

  //   await user.click(screen.getByTestId("next-button"));

  //   // Assert that handleNextMock has been called
  //   await waitFor(() => {
  //     expect(useFormik().handleSubmit).toHaveBeenCalledWith({
  //       firstName: "John",
  //       lastName: "Dee",
  //       Country: "Pakistan",
  //       Degree: "Master",
  //     });
  //   });

  //   // Assert that handleNextMock has been called
  //   expect(handleNext).toHaveBeenCalled();
  // });
});
