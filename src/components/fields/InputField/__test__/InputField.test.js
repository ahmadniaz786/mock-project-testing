import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField Component", () => {
  
  test("renders without crashing", () => {
    render(<InputField />);
    const inputElement = screen.getByTestId("input-field");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    render(<InputField />);
    const inputElement = screen.getByTestId("input-field");
    fireEvent.change(inputElement, { target: { value: "Hello" } });
    expect(inputElement.value).toBe("Hello");
  });

  test("disables input field when disabled prop is set", () => {
    render(<InputField disabled />);
    const inputElement = screen.getByTestId("input-field");
    expect(inputElement).toBeDisabled();
  });

  test("renders tooltip with provided text", () => {
    render(<InputField tooltip="Enter your name" />);
    const tooltipElement = screen.getByText("Enter your name");
    expect(tooltipElement).toBeInTheDocument();
  });

  test("triggers onClick handler when icon is clicked", () => {
    const onClickMock = jest.fn();
    render(<InputField showIcon onClick={onClickMock} />);
    const iconButton = screen.getByLabelText("toggle password visibility");
    fireEvent.click(iconButton);
    expect(onClickMock).toHaveBeenCalled();
  });

  test("displays loading skeleton when loading prop is true", () => {
    render(<InputField loading />);
    const skeletonElement = screen.getByTestId("loading-skeleton");
    expect(skeletonElement).toBeInTheDocument();
  });

  test("handles paste event based on pasteContent prop", () => {
    const pasteEvent = {
      preventDefault: jest.fn(),
    };
    render(<InputField pasteContent={false} />);
    const inputElement = screen.getByTestId("input-field");
    fireEvent.paste(inputElement, pasteEvent);
    expect(pasteEvent.preventDefault).toHaveBeenCalled();
  });

  test("updates formik values on blur with changed input value", () => {
    const formikValues = {
      name: "",
    };
    const setFieldValueMock = jest.fn();
    const formikMock = {
      values: formikValues,
      setFieldValue: setFieldValueMock,
    };
    render(<InputField formik={formikMock} name="name" />);
    const inputElement = screen.getByTestId("input-field");
    fireEvent.change(inputElement, { target: { value: "John Doe" } });
    fireEvent.blur(inputElement);
    expect(setFieldValueMock).toHaveBeenCalledWith("name", "John Doe");
  });
});
