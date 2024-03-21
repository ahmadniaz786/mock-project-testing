// AppRouter.js
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import DataForm from '../../pages/Form/Form';
import DataTable from '../../pages/Home/Home';


const AppRouter = () => {
  return (
      <Routes>
        <Route exact path="/" component={DataTable} />
        <Route path="/form" exact component={DataForm} />
      </Routes>
  );
};

export default AppRouter;