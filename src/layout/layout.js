import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DataForm from '../pages/Form/Form';
import Products from '../pages/Products/Products';
import DataTable from '../pages/Home/Home';
import { Header } from './header/header';
import { Box } from '@mui/material';
// import { Switch } from '@mui/material';

const Layout = () => {

  return (
      <>
            <Header />
            <Box component="main" sx={{ p: 6 }} >
                <Routes>
                    <Route exact path="/" element={<DataTable />} />
                    <Route path="/form" element={<DataForm />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </Box>
      </>
  );
};

export default Layout;
