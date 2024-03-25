import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import SwitchField from "../SwitchField";

describe("CheckboxField Component", () => {
  const handleChange = jest.fn();
  const formikMock = {
    setFieldValue: jest.fn(),
    values: { firstName: "", lastName: "", info_authenticity: "" },
    touched: {},
    errors: {},
  };

  beforeEach(() => {
    render(<SwitchField />);
  });

  test("renders without crashing", async () => {
    const checkboxElement = screen.getByTestId("switch-field");
    expect(checkboxElement).toBeInTheDocument();
  });

  test("will change the value to true", async () => {
    const switchElement = screen.getByTestId("switch-field");

    fireEvent.click(checkboxElement);

    expect(checkboxElement.checked).toBe(true);
  });

  //   test("will change the value to false", async () => {
  //     const checkbox = screen.getByRole("checkbox");
  //     expect(checkbox.checked).toBe(false);

  //     fireEvent.click(checkbox);

  //     expect(checkbox.checked).toBe(true);

  //     fireEvent.click(checkbox);

  //     expect(checkbox.checked).toBe(false);
  //   });
});
