import React, { useState, useEffect } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import { Chart1 } from "./components/Chart1";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Box pt={1}>
      <Grid item container sm={12} pt={2}>
        {loading ? (
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "calc(100vh - 175px)",
              WebkitTransform: "none",
            }}
          />
        ) : (
          <Chart1 />
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
