import React from "react";

// import { Box, Grid2 } from "src/shared/material";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { useFormik } from "formik";

// import { AutoCompleteField, InputField } from "src/";
import { InputField, AutoCompleteField } from "../../../../components/fields";

import { useValidationSchema, useInitialValues } from "./utils";
import FormHeader from "../FormHeader/FormHeader";

const Step4 = (props) => {
  const {
    loading,
    submitLoading,
    stepsArray,
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
        title={"Step 4"}
        steps={stepsArray}
      />
      <Box sx={{ p: 2, pt: 3, pointerEvents: submitLoading ? "none" : "auto" }}>
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="COMMERCIAL_NAME_LINE_1_A"
                type="text"
                loading={loading}
                label="COMMERCIAL_NAME_LINE_1_A"
                disabled={disableForm}
              />
            </Grid2>
            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="COMMERCIAL_NAME_LINE_2_A"
                type="text"
                loading={loading}
                label="COMMERCIAL_NAME_LINE_2_A"
              />
            </Grid2>
            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="COMMERCIAL_NAME_LINE_1_E"
                type="text"
                loading={loading}
                label="COMMERCIAL_NAME_LINE_1_E"
              />
            </Grid2>
            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="COMMERCIAL_NAME_LINE_2_E"
                type="text"
                loading={loading}
                label="COMMERCIAL_NAME_LINE_2_E"
              />
            </Grid2>
            <Grid2 xs={6}>
              <AutoCompleteField
                name="ENTITY_NATIONALITY"
                formik={formik}
                loading={loading}
                label="ENTITY_NATIONALITY"
                disabled={disableForm}
                options={countryOptions}
              />
            </Grid2>
            <Grid2 xs={6}>
              <AutoCompleteField
                name="PRIMARY_LANGUAGE"
                formik={formik}
                loading={loading}
                label="PRIMARY_LANGUAGE"
                disabled={disableForm}
                options={degreeOptions}
              />
            </Grid2>
            <Grid2 xs={6}>
              <AutoCompleteField
                name="STATEMENT_LANGUAGE"
                formik={formik}
                loading={loading}
                label="STATEMENT_LANGUAGE"
                disabled={disableForm}
                options={countryOptions}
              />
            </Grid2>
            <Grid2 xs={6}>
              <AutoCompleteField
                name="REGISTRATION_ISSUER"
                formik={formik}
                loading={loading}
                label="REGISTRATION_ISSUER"
                disabled={disableForm}
                options={countryOptions}
              />
            </Grid2>
            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="MAXIMUM_CEILING_AMOUNT"
                type="number"
                loading={loading}
                label="MAXIMUM_CEILING_AMOUNT"
              />
            </Grid2>
            {/* <Grid2 xs={6}>
                            <DatePickerField
                                formik={formik}
                                name='Project Start Date'
                                loading={loading}
                                label= 'PROJECT_LEASE_START_DATE'
                                disabled={disableForm}
                                maxDate={new Date()}
                            />
                        </Grid2 > */}
            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="PROJECT_DURATION"
                type="text"
                loading={loading}
                label="PROJECT_DURATION"
                disabled={disableForm}
              />
            </Grid2>
            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="CR_ISSUANCE_AUTHORITY"
                type="text"
                loading={loading}
                label="CR_ISSUANCE_AUTHORITY"
                disabled={disableForm}
              />
            </Grid2>
            {/* <Grid2 xs={6}>
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
                        </Grid2 > */}
            <Grid2 xs={6}>
              <InputField
                formik={formik}
                name="REASON_OF_DELETE"
                type="text"
                loading={loading}
                label="REASON_OF_DELETE"
                disabled={disableForm}
              />
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Box>
  );
};

export default React.memo(Step4);
