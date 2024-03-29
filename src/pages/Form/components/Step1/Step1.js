import React from "react";

import { Box, Grid } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { useFormik } from "formik";

import { InputField, AutoCompleteField } from "../../../../components/fields";
import FormHeader from "../FormHeader/FormHeader";

import { useValidationSchema, useInitialValues } from "./utils";

const Step1 = (props) => {
  const {
    loading,
    submitLoading,
    steps,
    activeStep,
    handleBack,
    handleNext,
    handleSubmit,
  } = props;

  const formik = useFormik({
    initialValues: useInitialValues(),

    validationSchema: useValidationSchema(),

    enableReinitialize: true,

    validateOnMount: true,

    onSubmit: (values) => {
      console.log(values, "submit");
    },
  });

  const handleNextClick = () => {
    formik.handleSubmit();
    if (formik?.isValid) {
      handleNext();
    }
  };

  const handleBackClick = () => {
    handleBack();
  };

  const countryOptions = [
    { label: "Pakistan", value: "Pakistan" },
    { label: "India", value: "India" },
    { label: "England", value: "England" },
    { label: "USA", value: "USA" },
  ];
  const degreeOptions = [
    { label: "Bachelor", value: "Bachelor" },
    { label: "Master", value: "Master" },
    { label: "PHD", value: "PHD" },
  ];

  return (
    <Box sx={{ background: "white", p: 3 }}>
      <FormHeader
        loading={loading}
        handleBack={handleBackClick}
        handleNext={handleNextClick}
        activeStep={activeStep}
        handleSubmit={handleSubmit}
        title={"Step 1"}
        steps={steps}
      />
      <Box sx={{ p: 2, pt: 3, pointerEvents: submitLoading ? "none" : "auto" }}>
        <form data-testid="step1-form">
          <Grid container spacing={2} justifyContent="space-around">
            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="firstName"
                type="text"
                loading={loading}
                required
                label="First Name"
              />
            </Grid>

            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="lastName"
                type="text"
                loading={loading}
                required
                label="Last Name"
              />
            </Grid>

            <Grid xs={5} mt={3}>
              <AutoCompleteField
                data-testid="country"
                name="Country"
                formik={formik}
                loading={loading}
                label="Country"
                options={countryOptions}
                required
              />
            </Grid>

            <Grid xs={5} mt={3}>
              <AutoCompleteField
                data-testid="degree"
                name="Degree"
                formik={formik}
                loading={loading}
                label="Degree"
                options={degreeOptions}
                required
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default React.memo(Step1);
