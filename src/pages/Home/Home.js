import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },

  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "family",
    headerName: "Family",
    type: "number",
    width: 150,
    editable: true,
  },
];

export default function DataTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);

  const getData = async () => {
    fetch("https://thronesapi.com/api/v2/Characters")
      .then((res) => res.json())
      .then((data) => setRows(data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
  }, []);

  const openUserDetails = () => {
    navigate("/form");
  };
  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        paddingTop: "40px",
      }}
    >
      <DataGrid
        data-testid="data-grid"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        onRowClick={openUserDetails}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
