import React from "react";

import { Box, Grid } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid/Grid";

import { useFormik } from "formik";
import FormHeader from "../FormHeader/FormHeader";

// import { AutoCompleteField, InputField } from "src/";
import { InputField, AutoCompleteField } from "../../../../components/fields";

import { useValidationSchema, useInitialValues } from "./utils";

const Step3 = (props) => {
  const {
    loading,
    submitLoading,
    steps,
    activeStep,
    handleBack,
    handleNext,
    disableForm,
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

  const countryOptions = [
    { label: "Pakistan", value: "Pakistan" },
    { label: "India", value: "India" },
    { label: "England", value: "England" },
    { label: "USA", value: "USA" },
  ];
  const MovieOptions = [
    { label: "Pakistan", value: "Pakistan" },
    { label: "India", value: "India" },
    { label: "England", value: "England" },
    { label: "USA", value: "USA" },
  ];

  return (
    <Box sx={{ background: "white", p: 3 }}>
      <FormHeader
        loading={loading}
        handleBack={handleBackClick}
        handleNext={handleNextClick}
        activeStep={activeStep}
        title={"Step 3"}
        steps={steps}
      />
      <Box sx={{ p: 2, pt: 3, pointerEvents: submitLoading ? "none" : "auto" }}>
        <form data-testid="form">
          <Grid container spacing={2} justifyContent="space-around">
            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="COMMERCIAL_NAME_LINE_1_A"
                type="text"
                loading={loading}
                label="COMMERCIAL_NAME_LINE_1_A"
                disabled={disableForm}
              />
            </Grid>
            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="COMMERCIAL_NAME_LINE_2_A"
                type="text"
                loading={loading}
                label="COMMERCIAL_NAME_LINE_2_A"
                disabled={true}
              />
            </Grid>
            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="COMMERCIAL_NAME_LINE_1_E"
                type="text"
                loading={loading}
                label="COMMERCIAL_NAME_LINE_1_E"
              />
            </Grid>
            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="COMMERCIAL_NAME_LINE_2_E"
                type="text"
                loading={loading}
                label="COMMERCIAL_NAME_LINE_2_E"
              />
            </Grid>
            <Grid xs={5} mt={3}>
              <AutoCompleteField
                name="ENTITY_NATIONALITY"
                formik={formik}
                loading={loading}
                label="ENTITY_NATIONALITY"
                disabled={disableForm}
                options={MovieOptions}
              />
            </Grid>
            <Grid xs={5} mt={3}>
              <AutoCompleteField
                name="PRIMARY_LANGUAGE"
                formik={formik}
                loading={loading}
                label="PRIMARY_LANGUAGE"
                disabled={disableForm}
                options={countryOptions}
              />
            </Grid>
            <Grid xs={5} mt={3}>
              <AutoCompleteField
                name="STATEMENT_LANGUAGE"
                formik={formik}
                loading={loading}
                label="STATEMENT_LANGUAGE"
                disabled={disableForm}
                options={countryOptions}
              />
            </Grid>
            <Grid xs={5} mt={3}>
              <AutoCompleteField
                name="REGISTRATION_ISSUER"
                formik={formik}
                loading={loading}
                label="REGISTRATION_ISSUER"
                disabled={disableForm}
                options={countryOptions}
              />
            </Grid>
            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="MAXIMUM_CEILING_AMOUNT"
                type="number"
                loading={loading}
                label="MAXIMUM_CEILING_AMOUNT"
              />
            </Grid>
            {/* <Grid xs={5} mt={3}>
                            <DatePickerField
                                formik={formik}
                                name='Project Start Date'
                                loading={loading}
                                label= 'PROJECT_LEASE_START_DATE'
                                disabled={disableForm}
                                maxDate={new Date()}
                            />
                        </Grid > */}
            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="PROJECT_DURATION"
                type="text"
                loading={loading}
                label="PROJECT_DURATION"
                disabled={disableForm}
              />
            </Grid>
            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="CR_ISSUANCE_AUTHORITY"
                type="text"
                loading={loading}
                label="CR_ISSUANCE_AUTHORITY"
                disabled={disableForm}
              />
            </Grid>
            {/* <Grid xs={5} mt={3}>
                            <DatePickerField
                                formik={formik}
                                name='Delete Date'
                                loading={loading}
                                label='DELETE_DATE'
                                maxDate={new Date()}
                                disabled={
                                    disableForm
                                    ||
                                    (
                                        formik?.values["Comp Location"] === "27"
                                        &&
                                        formik?.values["Comp Location"] !== ""
                                    )
                                }
                            />
                        </Grid > */}
            <Grid xs={5} mt={3}>
              <InputField
                formik={formik}
                name="REASON_OF_DELETE"
                type="text"
                loading={loading}
                label="REASON_OF_DELETE"
                disabled={disableForm}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default React.memo(Step3);
