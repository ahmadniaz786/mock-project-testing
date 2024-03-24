import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from '../Home';

describe('DataTable Component Unit Tests', () => {
  it('renders without crashing', () => {
    render(<DataTable />);
    const dataGridElement = screen.getByRole('grid');
    expect(dataGridElement).toBeInTheDocument();
  });

  it('renders the correct number of rows and columns', () => {
    render(<DataTable />);
    const rows = screen.getAllByRole('row');
    const columns = screen.getAllByRole('columnheader');
  });


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


  it('navigates to next and previous pages correctly', () => {
    render(<DataTable rows={rows} columns={columns} />);
    const nextPageButton = screen.getByTitle('Go to next page');
    const prevPageButton = screen.getByTitle('Go to previous page');
    
    fireEvent.click(nextPageButton);
    let page2Rows = screen.getAllByRole('row').slice(1); // Exclude header row
    expect(page2Rows[0]).toHaveTextContent('Jane Doe'); // Assuming pagination changes the order
    
    fireEvent.click(prevPageButton);
    let page1Rows = screen.getAllByRole('row').slice(1); // Exclude header row
    expect(page1Rows[0]).toHaveTextContent('John Doe');

  });


});
