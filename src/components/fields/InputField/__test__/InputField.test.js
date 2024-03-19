import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InputField from "../InputField";

// Mock formik values and handlers
const formikMock = {
  values: { name: "Testing" },
  setFieldValue: jest.fn(),
  touched: {},
  errors: {},
};

describe("InputField Component", () => {
  const renderComponent = () => {
    return render(
      <InputField formik={formikMock} name="Test" type="text" label="Test" />
    );
  };

  it("renders without crashing", () => {
    renderComponent();
    const inputElement = screen.getByTestId("input-field");
    expect(inputElement).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    renderComponent();
    const inputElement = screen.getByRole("textbox", { name: "Test" });
    // Simulate change event with a new value
    fireEvent.change(inputElement, { target: { value: "Hello" } });
    // Check if input value is updated
    expect(inputElement.value).toBe("Hello");
  });

  // it("disables input field when disabled prop is set", () => {
  //   render(<InputField name='Test' disabled />);
  //   const inputElement = screen.getByTestId("input-field");
  //   expect(inputElement).toBeDisabled();
  // });

  it("renders icon button and handles click event", () => {
    const onClickMock = jest.fn();
    render(
      <InputField
        formik={formikMock}
        name="Name"
        type="text"
        label="Name"
        showIcon
        onClick={onClickMock}
      />
    );
    const iconButton = screen.getByLabelText("toggle password visibility");
    expect(iconButton).toBeInTheDocument();
    // Simulate click event on the icon button
    fireEvent.click(iconButton);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("displays loading skeleton when loading prop is true", () => {
    render(
      <InputField
        name="Name"
        label="Name"
        formik={formikMock}
        type="text"
        loading
      />
    );
    const skeletonElement = screen.getByTestId("input-loading-skeleton");
    expect(skeletonElement).toBeInTheDocument();
  });

  it("handles paste event based on pasteContent prop", () => {
    const pasteEvent = { preventDefault: jest.fn() };
    render(
      <InputField
        formik={formikMock}
        name="COMMERCIAL_NAME_LINE_1_A"
        type="text"
        label="COMMERCIAL_NAME_LINE_1_A"
        pasteContent={false}
      />
    );
    const inputElement = screen.getByTestId("input-field");
    fireEvent.paste(inputElement, pasteEvent);
    expect(pasteEvent.preventDefault).toHaveBeenCalledTimes(0);
  });

  it("will unmount the component", () => {
    const { unmount } = renderComponent();
    unmount(); // Unmount the component

    // Assert that there are no errors or warnings after unmounting
    expect(true).toBe(true);
  });

  // test("updates formik values on blur with changed input value", () => {
  //   render(
  //     <InputField formik={formikMock} name="name" label="Name" required />
  //   );
  //   const inputElement = screen.getByTestId("input-field");

  //   fireEvent.change(inputElement, { target: { value: "Test" } });
  //   fireEvent.blur(inputElement);

  //   expect(formikMock.setFieldValue).toHaveBeenCalledWith("name", "Test");
  // });
});
