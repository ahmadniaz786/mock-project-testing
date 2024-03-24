import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import CheckboxField from "../Checkbox";

describe("CheckboxField Component", () => {
  const handleChange = jest.fn();
  const formikMock = {
    setFieldValue: jest.fn(),
    values: { firstName: "", lastName: "", info_authenticity: "" },
    touched: {},
    errors: {},
  };

  beforeEach(() => {
    render(
      <CheckboxField
        name={"Test"}
        label={"Test"}
        onChange={handleChange}
        formik={formikMock}
      />
    );
  });

  test("renders without crashing", async () => {
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeInTheDocument();
  });

  test("will change the value to true", async () => {
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });

  test("will change the value to false", async () => {
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(false);
  });
});
