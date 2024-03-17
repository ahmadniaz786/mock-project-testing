import React from "react";

// import {
//   Autocomplete,
//   TextField,
//   FormControl,
//   Skeleton,
// } from "src/shared/material";
import { Autocomplete, TextField, FormControl, Skeleton } from "@mui/material";

import { useState } from "react";

import { useEffect } from "react";

const AutoCompleteField = ({
  formik,

  name,

  label,

  onChange,

  required,
  loading,
}) => {
  const [idTypes, setIdTypes] = useState([]);

  const [defaultValue, setDefaultValue] = useState(null);

  useEffect(() => {
    if ((name && !defaultValue) || formik.values[name] === "")
      setDefaultValue(formik.values[name]);
  }, [formik, name]);

  return (
    <>
      {loading ? (
        <Skeleton variant="rounded" width={"100%"} height={55} />
      ) : (
        <FormControl
          key={name}
          fullWidth
          error={Boolean(formik?.touched[name] && formik?.errors[name])}
          sx={{ pointerEvents: "auto" }}
        >
          <Autocomplete
            data-testid="content-autocomplete"
            loading={true}
            fullWidth
            name={name}
            size="small"
            options={idTypes}
            value={defaultValue ? { Value: defaultValue } : null}
            getOptionLabel={(item) => (item?.Value ? item?.Value : "")}
            isOptionEqualToValue={(option, value) =>
              option.Value === value.Value
            }
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={Boolean(formik?.touched[name] && formik?.errors[name])}
                value={params.Name}
                label={label}
                required={required}
                variant="outlined"
                helperText={formik?.touched[name] && formik?.errors[name]}
              />
            )}
            onChange={(e, value) => {
              if (!value || value === "") {
                formik?.setFieldValue(name, "");

                setDefaultValue("");
              } else {
                formik?.setFieldValue(name, value.Value);
              }

              if (onChange) {
                onChange(value);
              }
            }}
          />
        </FormControl>
      )}
    </>
  );
};

export default React.memo(AutoCompleteField);
