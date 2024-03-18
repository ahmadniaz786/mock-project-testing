import React from "react";

// import { Box, Grid2 } from "src/shared/material";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { useFormik } from "formik";

// import { AutoCompleteField, InputField } from "src/";
import { InputField, AutoCompleteField } from "../../../../components/fields";
import FormHeader from "../FormHeader/FormHeader";

import { useValidationSchema, useInitialValues } from "./utils";

const Step1 = (props) => {
  const {
    loading,
    submitLoading,
    stepsArray,
    activeStep,
    handleBack,
    handleNext,
  } = props;

  const formik = useFormik({
    initialValues: useInitialValues(),

    validationSchema: useValidationSchema(),

    enableReinitialize: true,

    validateOnMount: true,

    onSubmit: (values) => {
      console.log(values, "FORM VALUES");
    },
  });

  const handleNextClick = () => {
    formik.handleSubmit();
    console.log(formik?.isValid, "Valid");
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
        title={"Step 1"}
        steps={stepsArray}
      />
      <Box sx={{ p: 2, pt: 3, pointerEvents: submitLoading ? "none" : "auto" }}>
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="firstName"
                type="text"
                loading={loading}
                required
                label="First Name"
              />
            </Grid2>

            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="lastName"
                type="text"
                loading={loading}
                required
                label="Last Name"
              />
            </Grid2>

            <Grid2 xs={6}>
              <AutoCompleteField
                name="Country"
                formik={formik}
                loading={loading}
                label="Country"
                options={countryOptions}
                required
              />
            </Grid2>

            <Grid2 xs={6}>
              <AutoCompleteField
                name="Degree"
                formik={formik}
                loading={loading}
                label="Degree"
                options={degreeOptions}
                required
              />
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Box>
  );
};

export default React.memo(Step1);
