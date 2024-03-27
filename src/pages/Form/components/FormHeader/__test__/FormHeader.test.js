import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import FormHeader from "../FormHeader";

describe("Form Header Component", () => {
  const handleBackMock = jest.fn();
  const handleNextMock = jest.fn();
  const handleSubmitMock = jest.fn();

  test("will render without crashing", () => {
    render(
      <div>
        <FormHeader
          loading={false}
          handleBack={handleBackMock}
          handleNext={handleNextMock}
          activeStep={0}
          title={"Step 1"}
          steps={[]}
        />
      </div>
    );

    const headerElement = screen.getByTestId("form-header");
    expect(headerElement).toBeInTheDocument();
  });

  test("will render the correct title", () => {
    render(
      <div>
        <FormHeader
          loading={false}
          handleBack={handleBackMock}
          handleNext={handleNextMock}
          activeStep={0}
          title={"Step 1"}
          steps={[]}
        />
      </div>
    );

    const title = screen.getByText("Step 1");
    expect(title).toBeInTheDocument();
  });

  test("will check if the back button is disabled when active step is 0", () => {
    render(
      <div>
        <FormHeader
          loading={false}
          handleBack={handleBackMock}
          handleNext={handleNextMock}
          activeStep={0}
          title={"Step 1"}
          steps={[]}
        />
      </div>
    );

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeDisabled();
    expect(handleBackMock).not.toHaveBeenCalled();
  });

  test("will check the back button should not be disabled when active step is not 0", () => {
    render(
      <div>
        <FormHeader
          loading={false}
          handleBack={handleBackMock}
          handleNext={handleNextMock}
          activeStep={1}
          title={"Step 1"}
          steps={[]}
        />
      </div>
    );

    const backButton = screen.getByTestId("back-button");
    expect(backButton).not.toBeDisabled();
  });

  test("will check the next button should not be in thee DOM and submit button should be in the DOM when last step is active", () => {
    render(
      <div>
        <FormHeader
          loading={false}
          handleBack={handleBackMock}
          handleNext={handleNextMock}
          activeStep={3}
          steps={["step1", "step2", "step3", "step4"]}
        />
      </div>
    );

    const nextButton = screen.queryByTestId("next-button");
    const submitButton = screen.getByTestId("submit-button");
    expect(nextButton).not.toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("will check the submit button is working properly", () => {
    render(
      <div>
        <FormHeader
          loading={false}
          handleBack={handleBackMock}
          handleNext={handleNextMock}
          handleSubmit={handleSubmitMock}
          activeStep={3}
          steps={["step1", "step2", "step3", "step4"]}
        />
      </div>
    );

    const submitButton = screen.getByTestId("submit-button");

    fireEvent.click(submitButton);
    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  test("will check if handleNext function works when clicked", () => {
    render(
      <div>
        <FormHeader
          loading={false}
          handleBack={handleBackMock}
          handleNext={handleNextMock}
          activeStep={1}
          steps={["step1", "step2", "step3", "step4"]}
        />
      </div>
    );

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    expect(handleNextMock).toHaveBeenCalled();
  });

  test("will check if handleBack function works when clicked", () => {
    render(
      <div>
        <FormHeader
          loading={false}
          handleBack={handleBackMock}
          handleNext={handleNextMock}
          activeStep={1}
          steps={["step1", "step2", "step3", "step4"]}
        />
      </div>
    );

    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);
    expect(handleBackMock).toHaveBeenCalled();
  });
});
