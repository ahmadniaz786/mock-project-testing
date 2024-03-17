import React from "react";

// import { Box, Grid2 } from "src/shared/material";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { useFormik } from "formik";

// import { AutoCompleteField, InputField } from "src/";
import { InputField, AutoCompleteField } from "../../../../components/fields";

import { useValidationSchema, useInitialValues } from "./utils";

const Step1 = (props) => {
  const {
    loading,

    submitLoading,
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

  return (
    <Box sx={{ background: "white", p: 3 }}>
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
                required
              />
            </Grid2>

            <Grid2 xs={6}>
              <AutoCompleteField
                name="Degree"
                formik={formik}
                loading={loading}
                label="Degree"

                // disabled={disableForm}
              />
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Box>
  );
};

export default React.memo(Step1);