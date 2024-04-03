import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Chart1 } from "../Chart1";

describe("Chart 1 Component", () => {
  const mockOptions = {
    chart: {
      type: "column",
      backgroundColor: "white",
    },
    title: {
      text: "Activities",
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yAxis: {
      min: 0,
      max: 10,
      tickInterval: 2,
      title: {
        text: "",
      },
    },
    series: [
      {
        name: "Mock Series 1",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Mock Series 2",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
    credits: {
      enabled: false,
    },
  };
  beforeEach(() => {
    render(<Chart1 options={mockOptions} />);
  });

  test("renders without crashing", () => {
    const chart1Element = screen.getByTestId("chart1");
    expect(chart1Element).toBeInTheDocument();
  });

  test("displays the correct data points for each series", () => {
    render(<Chart1 />);
    const seriesData = screen.getAllByTestId("highcharts-data");

    // Data points for each series
    const SRData = seriesData[0].textContent.split(",").map(Number);
    const AmendData = seriesData[1].textContent.split(",").map(Number);
    const AOData = seriesData[2].textContent.split(",").map(Number);

    // Expected data points
    const expectedSRData = [5, 3, 8, 6, 4, 2, 7];
    const expectedAmendData = [3, 7, 2, 8, 5, 6, 1];
    const expectedAOData = [8, 4, 6, 2, 9, 1, 7];

    expect(SRData).toEqual(expectedSRData);
    expect(AmendData).toEqual(expectedAmendData);
    expect(AOData).toEqual(expectedAOData);
  });

  test("checks that the x-axis labels match the specified categories", () => {
    render(<Chart1 />);
    const xAxisLabels = screen.getAllByTestId("highcharts-xaxis-labels");

    // Extracting x-axis labels text
    const labelsText = xAxisLabels.map((label) => label.textContent.trim());

    // Expected x-axis labels
    const expectedLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

    expect(labelsText).toEqual(expectedLabels);
  });

  test("ensures that the y-axis range and tick intervals are correct", () => {
    render(<Chart1 />);
    const yAxis = screen.getByTestId("highcharts-yaxis");

    // Extracting y-axis attributes
    const { min, max, tickInterval } = yAxis;

    // Expected y-axis attributes
    const expectedMin = 0;
    const expectedMax = 10;
    const expectedTickInterval = 2;

    expect(min).toBe(expectedMin);
    expect(max).toBe(expectedMax);
    expect(tickInterval).toBe(expectedTickInterval);
  });
});
