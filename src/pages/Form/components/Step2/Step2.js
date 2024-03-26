import React from "react";

// import { Box, Grid } from "src/shared/material";
import { Box, Typography, Grid } from "@mui/material";

import { useFormik } from "formik";

// import { AutoCompleteField, InputField } from "src/";
import {
  InputField,
  CheckboxField,
  SwitchField,
} from "../../../../components/fields";
import FormHeader from "../FormHeader/FormHeader";

import { useValidationSchema, useInitialValues } from "./utils";

const Step2 = (props) => {
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
      console.log(values, "FORM VALUES");
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

  return (
    <Box sx={{ background: "white", p: 3 }}>
      <FormHeader
        loading={loading}
        handleBack={handleBackClick}
        handleNext={handleNextClick}
        activeStep={activeStep}
        handleSubmit={handleSubmit}
        title={"Step 2"}
        steps={steps}
      />
      <Box sx={{ p: 2, pt: 3, pointerEvents: submitLoading ? "none" : "auto" }}>
        <form data-testid="step2-form">
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

            <Grid xs={6} mt={3}>
              <CheckboxField
                data-testid="certify-checkbox"
                name="info_authenticity"
                formik={formik}
                loading={loading}
                label="I certify the presented information is correct"
              />
            </Grid>

            <Grid xs={6} mt={3}>
              <SwitchField
                name="promo_emails"
                formik={formik}
                loading={loading}
                label="Do you want to recieve promotion emails"
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default React.memo(Step2);
