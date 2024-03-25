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
    render(<SwitchField formik={formikMock} name="info_authenticity" />);
  });
  test("renders without crashing", async () => {
    const switchElement = screen.getByRole("checkbox");
    expect(switchElement).toBeInTheDocument();
  });

  test("will change the value to true", async () => {
    const switchElement = screen.getByRole("checkbox");
    fireEvent.click(switchElement);

    expect(switchElement.checked).toBe(true);
  });

  test("will change the value to false", async () => {
    const switchElement = screen.getByRole("checkbox");
    expect(switchElement.checked).toBe(false);

    fireEvent.click(switchElement);

    expect(switchElement.checked).toBe(true);

    fireEvent.click(switchElement);

    expect(switchElement.checked).toBe(false);
  });
});
