import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step1 from "../Step1";

describe("Step1 Component", () => {
  const handleNext = jest.fn();

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
    const user = userEvent.setup();

    await user.type(
      screen.getByRole("textbox", { name: "First Name" }),
      "John"
    );
    await user.type(screen.getByRole("textbox", { name: "Last Name" }), "Dee");
    // await user.type(
    //   screen.getByLabelText("Country", { name: "Country" }),
    //   "Pakistan"
    // );
    // await user.type(
    //   screen.getByLabelText("Degree", { name: "Degree" }),
    //   "Master"
    // );

    await user.click(screen.getByTestId("next-button"));

    // Assert that handleNextMock has been called
    // await waitFor(() => expect(handleNext).toHaveBeenCalled());
  });
});
