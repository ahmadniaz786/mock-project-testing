import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataTable from '../Home';
import { Route, Router, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import DataForm from '../../Form/Form';
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from "history";

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use the actual react-router-dom module
  useNavigate: () => jest.fn(), // Mock useNavigate to return a jest.fn()
}));


describe('DataTable Component Unit Tests', () => {

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <DataTable/>
        <Routes>
          <Route path="/form" element={<DataForm />} />
        </Routes>
      </MemoryRouter>
    );
  };


  it('navigates to the next page when clicking the next button', () => {
    render(<DataTable />);

    // Find the next page button by its title attribute or accessible label
    const nextPageButton = screen.getByTitle('Go to next page');

    // Click the next page button
    fireEvent.click(nextPageButton);

    // Assert that the table is updated and shifted to the next page
    const updatedTable = screen.getByTestId('data-form'); 
    
    // Assuming data-testid is used to identify the table
    expect(updatedTable).toBeInTheDocument();

  });

  it('navigates to the next page when clicking the next button', () => {
    render(<DataTable />);

    // Find the next page button by its title attribute or accessible label
    const nextPageButton = screen.getByTitle('Go to previous page');

    // Click the next page button
    fireEvent.click(nextPageButton);

    // Assert that the table is updated and shifted to the next page
    const updatedTable = screen.getByTestId('data-form'); 
    
    // Assuming data-testid is used to identify the table
    expect(updatedTable).toBeInTheDocument();

  });

  test("clicking filter links updates product query params", () => {
    let testHistory, testLocation;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DataForm />
        <Route
          path="*"
          render={({ history, location }) => {
            testHistory = history;
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>,
      
    );
  
    act(() => {
      const firstRow = screen.getAllByRole('row')[1]; // Assuming row 2 is the first row in the table
      fireEvent.click(firstRow);
    });
  
    // assert about url
    expect(testLocation.pathname).toBe("/form");
    // const searchParams = new URLSearchParams(testLocation.search);
    // expect(searchParams.has("id")).toBe(true);
    // expect(searchParams.get("id")).toEqual("1234");
  });
 
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
