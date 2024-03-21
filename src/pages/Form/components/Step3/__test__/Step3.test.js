import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Step3 from '../Step3';


describe('Step3 Component Integration Tests', () => {

    it('displays form validation errors on clicking "Next" button', async() => {
        // Render the components
        render(
          <>
            <Step3 handleNext={()=>{}}/>
          </>
        );
        // Click the "Next" button to proceed to the form
        fireEvent.click(screen.getByTestId('next-button'));

        // Check if validation error messages are displayed
        const errorMessage = await screen.findByText("COMMERCIAL_NAME_LINE_1_A is required");
        expect(errorMessage).toBeInTheDocument();
      });
  // Add more test cases as needed
});



////////////////////
// test('renders all input fields and autocomplete fields', () => {
//     render(<Step3 />);
    
//     const commercialNameLine1A = screen.getByLabelText('COMMERCIAL_NAME_LINE_1_A');
//     expect(commercialNameLine1A).toBeInTheDocument();

//     const entityNationality = screen.getByLabelText('ENTITY_NATIONALITY');
//     expect(entityNationality).toBeInTheDocument();

//     // Continue with other input fields and autocomplete fields
//   });

//   test('handles form submission on next button click', () => {
//     render(<Step3 />);
    
//     const nextButton = screen.getByText('Next');
//     fireEvent.click(nextButton);

//     // Add assertions for form submission
//   });

//   test('updates formik state on input field change', async () => {
//     render(<Step3 />);
    
//     const commercialNameLine1A = screen.getByLabelText('COMMERCIAL_NAME_LINE_1_A');
//     fireEvent.change(commercialNameLine1A, { target: { value: 'Test Value' } });

//     // Wait for formik state to update
//     await waitFor(() => expect(commercialNameLine1A.value).toBe('Test Value'));
//   });

//   test('selects option from autocomplete field and updates formik state', async () => {
//     render(<Step3 />);
    
//     const entityNationality = screen.getByLabelText('ENTITY_NATIONALITY');
//     fireEvent.change(entityNationality, { target: { value: 'Pakistan' } });

//     // Wait for formik state to update
//     await waitFor(() => expect(entityNationality.value).toBe('Pakistan'));
//   });

////////////////////

// Mock Formik's validate function to return an object with errors
