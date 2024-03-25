import * as React from "react";
import { FormControlLabel, Checkbox, Skeleton } from "@mui/material";

const CheckboxField = ({ formik, name, label, loading, onChange }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (formik?.values[name] === "") {
      setChecked(false);
    } else if (formik?.values[name] === "Yes" || formik?.values[name] === "Y") {
      setChecked(true);
    } else if (formik?.values[name] === "No" || formik?.values[name] === "N") {
      setChecked(false);
    }
  }, [formik?.values, name]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    formik.setFieldValue(name, e.target.checked);
  };
  return (
    <>
      {loading ? (
        <Skeleton variant="rounded" width={"100%"} height={55} />
      ) : (
        <FormControlLabel
          aria-labelledby="demo-row-radio-buttons-group-label"
          label={label}
          control={
            <Checkbox
              name={name}
              checked={checked}
              onChange={handleChange}
              error={Boolean(formik?.touched?.[name] && formik?.errors?.[name])}
              helperText={formik?.touched?.[name] && formik?.errors?.[name]}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      )}
    </>
  );
};
export default CheckboxField;
