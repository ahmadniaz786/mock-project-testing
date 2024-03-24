import * as React from "react";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { CorporateAccountOpening } from "../../assets/Icons";
import { Box, ButtonBase, Grid, Paper, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Products = () => {
  const navigate = useNavigate();

  const selectCompany = () => {
    navigate("/");
  };
  return (
    <Box sx={{ maxWidth: "80%", margin: "auto", mt: 10 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={3} sm={4} md={3}>
          <ButtonBase
            sx={{ width: "100%" }}
            onClick={selectCompany.bind(this, "")}
          >
            <Item
              sx={{
                height: "200px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography color="primary.main" fontWeight="bold">
                    CORPORATE ACCOUNT OPENING
              </Typography>
              <Box mt={2}>{CorporateAccountOpening()}</Box>
            </Item>
          </ButtonBase>
        </Grid>
        {/* <Grid item xs={3} sm={4} md={3}>
          <ButtonBase
            component={Link}
            to={"/dashboard"}
            sx={{ width: "100%" }}
            onClick={selectCompany.bind(this, "")}
          >
            {" "}
            <Item
              sx={{
                height: "200px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography color="primary.main" fontWeight="bold">
                {RBConsts.LangConst[langCode]?.NAV.DASHBOARD}
              </Typography>
              <Box mt={2}>{CorporateAccountOpening()}</Box>
            </Item>
          </ButtonBase>
        </Grid>
        <Grid item xs={3} sm={4} md={3}>
          <ButtonBase
            component={Link}
            to={"/amendment1"}
            sx={{ width: "100%" }}
            onClick={selectCompany.bind(this, "")}
          >
            {" "}
            <Item
              sx={{
                height: "200px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography color="primary.main" fontWeight="bold">
                Amendment - 1
              </Typography>
              <Box mt={2}>{CorporateAccountOpening()}</Box>
            </Item>
          </ButtonBase>
        </Grid>
        <Grid item xs={3} sm={4} md={3}>
          <ButtonBase
            component={Link}
            to={"/amendment2"}
            sx={{ width: "100%" }}
            onClick={selectCompany.bind(this, "")}
          >
            {" "}
            <Item
              sx={{
                height: "200px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography color="primary.main" fontWeight="bold">
                Amendment - 2
              </Typography>
              <Box mt={2}>{CorporateAccountOpening()}</Box>
            </Item>
          </ButtonBase>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Products;
