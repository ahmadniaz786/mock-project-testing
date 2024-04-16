import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import DataTable from "../Home";

describe("DataTable Component Unit Tests", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <DataTable />
      </BrowserRouter>
    );
  });

  // test("fetches data and renders rows correctly", async () => {
  //   // Mocking the fetch function and providing a mocked response
  //   jest.spyOn(global, "fetch").mockResolvedValueOnce({
  //     json: async () => [
  //       {
  //         id: 0,
  //         firstName: "Daenerys",
  //         lastName: "Targaryen",
  //         fullName: "Daenerys Targaryen",
  //         family: "House Targaryen",
  //       },
  //       {
  //         id: 1,
  //         firstName: "Samwell",
  //         lastName: "Tarly",
  //         fullName: "Samwell Tarly",
  //         family: "House Tarly",
  //       },
  //       // Add more mocked data as needed
  //     ],
  //   });

  //   // Render the DataTable component

  //   // Wait for the data to be fetched and displayed
  //   await waitFor(() => {
  //     expect(screen.getByText(/Daenerys/)).toBeInTheDocument();
  //     expect(screen.getByText(/Samwell/)).toBeInTheDocument();
  //     // Add more assertions as needed
  //   });

  //   // Clean up mock
  //   global.fetch.mockRestore();
  // });

  // it("navigates to the next page when clicking the next button", () => {
  //   // Find the next page button by its title attribute or accessible label
  //   const nextPageButton = screen.getByTitle("Go to next page");

  //   // Click the next page button
  //   fireEvent.click(nextPageButton);

  //   // Assert that the table is updated and shifted to the next page
  //   const updatedTable = screen.getByTestId("data-grid");

  //   // Assuming data-testid is used to identify the table
  //   expect(updatedTable).toBeInTheDocument();
  // });

  // it("navigates to the next page when clicking the next button", () => {
  //   // Find the next page button by its title attribute or accessible label
  //   const nextPageButton = screen.getByTitle("Go to previous page");

  //   // Click the next page button
  //   fireEvent.click(nextPageButton);

  //   // Assert that the table is updated and shifted to the next page
  //   const updatedTable = screen.getByTestId("data-grid");

  //   // Assuming data-testid is used to identify the table
  //   expect(updatedTable).toBeInTheDocument();
  // });

  it('navigates to "/form" page when a data row is clicked', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <DataTable />
      </MemoryRouter>
    );

    // Mock the fetch function to return some data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 0,
              firstName: "Daenerys",
              lastName: "Targaryen",
              fullName: "Daenerys Targaryen",
              family: "House Targaryen",
            },
          ]),
      })
    );

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText(/Daenerys/)).toBeInTheDocument();
    });

    // Find the cell containing the "Daenerys" text
    const cell = screen.getByText("Daenerys", {
      selector: ".MuiDataGrid-cellContent",
    });

    // Click on the cell
    fireEvent.click(cell);

    // Wait for navigation to occur
    await waitFor(() => {
      expect(window.location.pathname).toBe("/form");
    });
  });
});
