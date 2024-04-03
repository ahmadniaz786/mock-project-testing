import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    type: "column",
    backgroundColor: "white",
  },
  title: {
    text: "Activities",
    align: "left",
    verticalAlign: "top",
    x: 0,
    y: 80,
    style: {
      fontWeight: 400,
      color: "#2E2466",
    },
  },
  legend: {
    layout: "horizontal",
    align: "right",
    verticalAlign: "top",
    x: -50,
    y: 20,
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    labels: {
      formatter: function () {
        return this.value.substring(0, 3); // Display only the first 3 characters of the month
      },
    },
  },
  yAxis: {
    min: 0,
    max: 10,
    tickInterval: 2,
    title: {
      text: "",
    },
  },
  plotOptions: {
    column: {
      borderRadius: 10,
      colorByPoint: false,
      borderWidth: 0, // Remove border
      states: {
        hover: {
          borderWidth: 0, // Remove border on hover
        },
      },
    },
  },
  series: [
    {
      name: "SR",
      data: [5, 3, 8, 6, 4, 2, 7],
      color: "#2E2466", // Set unique color for SR data set
    },
    {
      name: "Amend",
      data: [3, 7, 2, 8, 5, 6, 1],
      color: "#00A895", // Set unique color for Amend data set
    },
    {
      name: "AO",
      data: [8, 4, 6, 2, 9, 1, 7],
      color: "#E3E3E4", // Set unique color for AO data set
    },
  ],
  credits: {
    enabled: false,
  },
};

export const Chart1 = () => {
  return (
    <div data-testid="chart1">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
