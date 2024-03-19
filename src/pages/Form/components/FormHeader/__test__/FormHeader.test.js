import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import FormHeader from "../FormHeader";

describe("Step1 Component", () => {
  beforeEach(() => {
    render(
      <div>
        <FormHeader />
      </div>
    );
  });

  test("form renders without crashing", () => {
    const headerElement = screen.getByTestId("form-header");
    expect(headerElement).toBeInTheDocument();
  });
});
