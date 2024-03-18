import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import AutoCompleteField from "../AutoCompleteField";

describe("AutoCompleteField Component", () => {
  const onSelect = jest.fn();
  const mockOpt = [
    { label: "one", value: "one" },
    { label: "two", value: "two" },
  ];

  beforeEach(() => {
    render(
      <AutoCompleteField
        options={mockOpt}
        label="Autocomplete"
        onChange={(value) => onSelect(value)}
      />
    );
  });
  test("renders without crashing", async () => {
    const dropdownElement = screen.getByTestId("dropdown-field");
    expect(dropdownElement).toBeInTheDocument();
  });

  test("will display options for the dropdown", () => {
    const downButton = screen.getByTitle("Open");

    act(() => {
      fireEvent.click(downButton);
    });
    let dropdown = screen.getByRole("listbox");
    expect(dropdown).toBeInTheDocument();
    const option1 = screen.getByText("one");
    expect(option1).toBeInTheDocument();
  });

  test("will filter options", () => {
    const downButton = screen.getByTitle("Open");
    const input = screen.getByRole("combobox");

    act(() => {
      fireEvent.click(downButton);
    });
    fireEvent.change(input, { target: { value: "one" } });
    let options = screen.queryAllByRole("option");
    expect(options.length).toBe(1);
  });

  test("will select the selected option", () => {
    const dropdownElement = screen.getByTestId("dropdown-field");
    const downButton = screen.getByTitle("Open");
    const input = screen.getByRole("combobox");

    act(() => {
      fireEvent.click(downButton);
    });
    fireEvent.keyDown(dropdownElement, { key: "ArrowDown" });
    fireEvent.keyDown(dropdownElement, { key: "Enter" });
    expect(input).toHaveValue("one");
  });

  test("will select the selected option", () => {
    const dropdownElement = screen.getByTestId("dropdown-field");
    const downButton = screen.getByTitle("Open");
    const input = screen.getByRole("combobox");

    act(() => {
      fireEvent.click(downButton);
    });
    fireEvent.keyDown(dropdownElement, { key: "ArrowDown" });
    fireEvent.keyDown(dropdownElement, { key: "Enter" });
    expect(input).toHaveValue("one");

    const clearButton = screen.getByTitle("Clear");
    act(() => {
      fireEvent.click(clearButton);
    });
    expect(input).toHaveValue("");
  });
});
