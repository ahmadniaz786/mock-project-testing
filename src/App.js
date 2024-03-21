// import { Route } from "@mui/icons-material";
// import AppRouter from "./components/routes/AppRoutes";
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import DataForm from "./pages/Form/Form";
import DataTable from "./pages/Home/Home";


function App() {
  
  const router = createBrowserRouter([
    { 
      path: "/",
      element: <DataTable />,
    },
    {
      path: "/form",
      element: <DataForm/>,
    },
  ]);  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
