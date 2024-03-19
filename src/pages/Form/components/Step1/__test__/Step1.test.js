import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Step1 from "../Step1";

describe("Step1 Component", () => {
  beforeEach(() => {
    render(<Step1 />);
  });

  test("form renders without crashing", () => {
    const formElement = screen.getByTestId("step1-form");
    expect(formElement).toBeInTheDocument();
  });
});
