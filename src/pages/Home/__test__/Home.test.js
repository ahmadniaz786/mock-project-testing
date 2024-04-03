import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DataTable from "../Home";
import axios from "axios";
// Mock axios
jest.mock("axios");

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Use the actual react-router-dom module
  useNavigate: () => jest.fn(), // Mock useNavigate to return a jest.fn()
}));

describe("DataTable Component Unit Tests", () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  it("fetches and displays data correctly", async () => {
    // Mock response data
    const mockData = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        family: 5,
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        fullName: "Jane Doe",
        family: 3,
      },
      // Add more mock data as needed
    ];

    // Mock axios.get implementation to return mock data
    axios.get.mockResolvedValueOnce({ data: mockData });

    // Render the component
    render(<DataTable />);

    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      // Check if data is displayed correctly
      const firstRow = screen.getByText("John Doe");
      expect(firstRow).toBeInTheDocument();
      const secondRow = screen.getByText("Jane Doe");
      expect(secondRow).toBeInTheDocument();
      // Add more assertions as needed
    });

    // Optionally, you can test if the API was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "https://thronesapi.com/api/v2/Characters"
    );
  });

  it("navigates to the next page when clicking the next button", () => {
    render(<DataTable />);

    // Find the next page button by its title attribute or accessible label
    const nextPageButton = screen.getByTitle("Go to next page");

    // Click the next page button
    fireEvent.click(nextPageButton);

    // Assert that the table is updated and shifted to the next page
    const updatedTable = screen.getByTestId("data-form");

    // Assuming data-testid is used to identify the table
    expect(updatedTable).toBeInTheDocument();
  });

  it("navigates to the next page when clicking the next button", () => {
    render(<DataTable />);

    // Find the next page button by its title attribute or accessible label
    const nextPageButton = screen.getByTitle("Go to previous page");

    // Click the next page button
    fireEvent.click(nextPageButton);

    // Assert that the table is updated and shifted to the next page
    const updatedTable = screen.getByTestId("data-form");

    // Assuming data-testid is used to identify the table
    expect(updatedTable).toBeInTheDocument();
  });

  // test("clicking filter links updates product query params", () => {
  //   let testHistory, testLocation;
  //   render(
  //     <MemoryRouter initialEntries={["/"]}>
  //       <DataForm />
  //       <Routes>
  //         <Route
  //           path="*"
  //           render={({ history, location }) => {
  //             testHistory = history;
  //             testLocation = location;
  //             return null;
  //           }}
  //         />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   act(() => {
  //     const firstRow = screen.getAllByRole("row")[1]; // Assuming row 2 is the first row in the table
  //     fireEvent.click(firstRow);
  //   });

  //   // assert about url
  //   expect(testLocation.pathname).toBe("/form");

  // });

  // it('should change current location to login when button is clicked', () => {
  //   const history = createMemoryHistory({ initialEntries: ['/form'] });
  //   const { getByText } = render(
  //     <Router history={history}>
  //       <DataForm />
  //     </Router>
  //   );
  //   expect(history.location.pathname).toBe('/form');
  //   console.log('getByText',getByText)
  //   // fireEvent.click(getByText('Iniciar sesión'));
  //   // expect(history.location.pathname).toBe('/login');
  // });

  // it('renders without crashing', () => {
  //   renderComponent()
  //   // Add your test assertions here
  // });

  // it('navigates to the correct route when a row is clicked', async () => {
  //   // const history = createMemoryHistory({ initialEntries: ['/'] }); // Initialize history with an initial entry
  //   const history = createBrowserHistory()

  //   // const history = useHistory();
  //   render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <DataTable/>
  //       <Routes>
  //               <Route exact path="/" element={<DataTable />} />
  //               <Route path="/form" element={<DataForm />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   // const dataGrid = screen.getByTestId('data-grid');
  //   // fireEvent.click(dataGrid.querySelector('.MuiDataGrid-row'));
  //   // expect(history.location.pathname).toBe('/form');

  //   // Find all rows in the DataTable
  //   const rows = screen.getAllByRole('row');

  //   // Simulate clicking each row and check if the correct route is navigated to
  //   for (const row of rows) {
  //     fireEvent.click(row);
  //     const message = screen.getByTestId("form");
  //     expect(message).toBeInTheDocument();
  //     // Wait for the navigation to occur
  //     // await waitFor(() => {
  //     //   // console.log('Current Path:', location.pathname);
  //     //   // expect(location.pathname).toBe('/form');

  //     // });

  //     // history.push('/');
  //   }
  //   console.log("history: ",history.location.pathname)

  // });

  // it('renders without crashing', () => {
  //   render(<DataTable rows={rows} columns={columns}/>);
  //   const dataGridElement = screen.getByRole('grid');
  //   expect(dataGridElement).toBeInTheDocument();
  // });

  // it('renders the correct number of rows and columns', () => {
  //   render(<DataTable rows={rows} columns={columns} />);
  //   const rows = screen.getAllByRole('row');
  //   const columns = screen.getAllByRole('columnheader');
  // });

  // it('renders pagination controls', () => {
  //   render(<DataTable />);
  //   const nextPageButton = screen.getByRole('button', { name: 'Next page' });
  //   const previousPageButton = screen.getByRole('button', { name: 'Previous page' });
  //   const pageSelector = screen.getByLabelText('Go to page');

  //   expect(nextPageButton).toBeInTheDocument();
  //   expect(previousPageButton).toBeInTheDocument();
  //   expect(pageSelector).toBeInTheDocument();
  // });

  // it('updates grid when clicking pagination controls', () => {
  //   render(<DataTable />);
  //   const nextPageButton = screen.getByRole('button', { name: 'Next page' });

  //   fireEvent.click(nextPageButton);

  //   // Write assertions to check that the grid is updated with the next page data
  // });

  // it('navigates to next and previous pages correctly', () => {
  //   render(<DataTable rows={rows} columns={columns} />);
  //   const nextPageButton = screen.getByTitle('Go to next page');
  //   const prevPageButton = screen.getByTitle('Go to previous page');

  //   fireEvent.click(nextPageButton);
  //   let page2Rows = screen.getAllByRole('row').slice(1); // Exclude header row
  //   expect(page2Rows[0]).toHaveTextContent('Jane Doe'); // Assuming pagination changes the order

  //   fireEvent.click(prevPageButton);
  //   let page1Rows = screen.getAllByRole('row').slice(1); // Exclude header row
  //   expect(page1Rows[0]).toHaveTextContent('John Doe');

  // });
});
