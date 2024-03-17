import React from "react";

import { useEffect } from "react";

import { useState } from "react";

// import {
//   IconButton,
//   InputAdornment,
//   Skeleton,
//   TextField,
//   Tooltip,
// } from "src/shared/material";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

import SearchIcon from "@mui/icons-material/Search";

function InputField({
  formik,

  name,

  label,

  type,

  disabled,

  loading,

  multiline,

  rows,

  showIcon,

  onClick,

  tooltip,

  pasteContent,

  required,
}) {
  const [fieldValue, setFieldValue] = useState(formik.values[name] || "");

  useEffect(() => {
    if (formik.values[name] || formik.values[name] === "") {
      setFieldValue(formik.values[name]);
    }
  }, [formik, formik.values, name]);

  const updateValue = (e) => {
    setFieldValue(e.target.value);
  };

  const onBlur = (e) => {
    if (formik.values[name] === fieldValue) return;

    formik.setFieldValue(name, e.target.value);
  };

  const handlePaste = (e) => {
    if (pasteContent === false) {
      e.preventDefault();
    }
  };

  return (
    <>
      {loading ? (
        <Skeleton variant="rounded" width={"100%"} height={55} />
      ) : (
        <Tooltip title={tooltip} placement="top">
          <TextField
            fullWidth
            variant="outlined"
            name={name}
            label={label}
            type={type}
            value={fieldValue}
            onChange={updateValue}
            onBlur={onBlur}
            error={Boolean(formik?.touched[name] && formik?.errors[name])}
            helperText={formik?.touched[name] && formik?.errors[name]}
            disabled={disabled}
            size="small"
            multiline={multiline}
            rows={rows}
            onPaste={handlePaste}
            required={required ?? required}
            InputProps={
              showIcon && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={onClick}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }
          />
        </Tooltip>
      )}
    </>
  );
}

export default React.memo(InputField);
