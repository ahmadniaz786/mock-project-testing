import React from "react";

// import {
//   Autocomplete,
//   TextField,
//   FormControl,
//   Skeleton,
// } from "src/shared/material";
import {
  Autocomplete,
  TextField,
  FormControl,
  Skeleton,
  Box,
  Typography,
} from "@mui/material";

import { useState } from "react";

import { useEffect } from "react";

const AutoCompleteField = ({
  formik,
  name,
  label,
  options,
  required,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <Skeleton variant="rounded" width={"100%"} height={55} />
      ) : (
        <FormControl
          key={name}
          fullWidth
          // error={Boolean(formik?.touched[name] && formik?.errors[name])}
          // helperText={formik?.touched?.[name] && formik?.errors?.[name]}
          sx={{ pointerEvents: "auto" }}
        >
          <Autocomplete
            data-testid="dropdown-field"
            id={name}
            // error={Boolean(formik?.touched?.[name] && formik?.errors?.[name])}
            // helperText={formik?.touched?.[name] && formik?.errors?.[name]}
            options={options}
            getOptionLabel={(option) => option.label} // Specify how to extract the label
            onChange={(e, val) => {
              formik?.setFieldValue(name, val ? val.value : ""); // Adjust for the case when value is null
            }}
            renderOption={(props, option) => (
              <Box
                display="flex"
                component="li"
                flexDirection="row"
                alignItems="center"
                {...props}
              >
                <Typography variant="body2">{option.label}</Typography>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                name={name}
                label={label}
                variant="outlined"
                error={Boolean(
                  formik?.touched?.[name] && formik?.errors?.[name]
                )}
                helperText={formik?.touched?.[name] && formik?.errors?.[name]}
                fullWidth
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </FormControl>
      )}
    </>
  );
};

export default React.memo(AutoCompleteField);
