import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IconButton, InputAdornment, Skeleton, TextField, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function InputField({ 
  formik, name, label, type, disabled, loading, multiline, rows, showIcon, onClick, tooltip, pasteContent, required,}) {
  const [fieldValue, setFieldValue] = useState(formik?.values?.[name] || "");

  useEffect(() => {
    if (formik?.values?.[name] || formik?.values?.[name] === "") {
      setFieldValue(formik.values[name]);
    }
  }, [formik, name]);

  const updateValue = (e) => {
    setFieldValue(e.target.value);
  };

  const onBlur = (e) => {
    if (formik?.values?.[name] === fieldValue) return;

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
        <Skeleton data-testid="input-loading-skeleton" variant="rounded" width={"100%"} height={55} />
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
            error={Boolean(formik?.touched?.[name] && formik?.errors?.[name])}
            helperText={formik?.touched?.[name] && formik?.errors?.[name]}
            disabled={disabled}
            size="small"
            multiline={multiline}
            rows={rows}
            onPaste={handlePaste}
            required={required ?? required}
            data-testid="input-field"
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

InputField.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  showIcon: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  pasteContent: PropTypes.bool,
  required: PropTypes.bool,
};

export default React.memo(InputField);
