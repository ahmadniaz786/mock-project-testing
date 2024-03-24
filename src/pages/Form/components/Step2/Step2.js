import React from "react";

// import { Box, Grid } from "src/shared/material";
import { Box, Typography, Grid } from "@mui/material";

import { useFormik } from "formik";

// import { AutoCompleteField, InputField } from "src/";
import {
  InputField,
  AutoCompleteField,
  CheckboxField,
  SwitchField,
} from "../../../../components/fields";
import FormHeader from "../FormHeader/FormHeader";

import { useValidationSchema, useInitialValues } from "./utils";

const Step2 = (props) => {
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
        title={"Step 2"}
        steps={stepsArray}
      />
      <Box sx={{ p: 2, pt: 3, pointerEvents: submitLoading ? "none" : "auto" }}>
        <form>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <InputField
                formik={formik}
                name="firstName"
                type="text"
                loading={loading}
                required
                label="First Name"
              />
            </Grid>

            <Grid xs={6}>
              <InputField
                formik={formik}
                name="lastName"
                type="text"
                loading={loading}
                required
                label="Last Name"
              />
            </Grid>

            <Grid xs={6}>
              <CheckboxField
                name="info_authenticity"
                formik={formik}
                loading={loading}
                label="I certify the presented information is correct"
              />
            </Grid>

            <Grid>
              <SwitchField
                name="promo_emails"
                formik={formik}
                loading={loading}
              />
            </Grid>
            <Grid>
              <Typography variant="subtitle2">
                Do you want to recieve promotion emails
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default React.memo(Step2);
