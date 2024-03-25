import * as React from "react";

import { Skeleton, FormControlLabel } from "@mui/material";

import { styled } from "@mui/material/styles";

import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,

  height: 26,

  padding: 0,

  "& .MuiSwitch-switchBase": {
    padding: 0,

    margin: 2,

    transitionDuration: "300ms",

    "&.Mui-checked": {
      transform: "translateX(16px)",

      color: "#fff",

      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#1D9B80",

        opacity: 1,

        border: 0,
      },

      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },

    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",

      border: "6px solid #fff",
    },

    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },

    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },

  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",

    width: 22,

    height: 22,
  },

  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,

    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#1D9B80",

    opacity: 1,

    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const SwitchField = ({ formik, name, loading, onChange, label }) => {
  const [checked, setValue] = React.useState(false);

  React.useEffect(() => {
    if (formik?.values[name] === "") {
      setValue(false);
    } else if (formik?.values[name] === "Yes" || formik?.values[name] === "Y") {
      setValue(true);
    } else if (formik?.values[name] === "No" || formik?.values[name] === "N") {
      setValue(false);
    }
  }, [formik?.values, name]);

  const handleChange = (event) => {
    setValue(event.target.checked);

    formik?.setFieldValue(name, event.target.checked === true ? "Yes" : "No");

    if (onChange) {
      onChange(event.target.checked === true ? "Y" : "N");
    }
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
            <IOSSwitch
              data-testid="switch-field"
              name={name}
              checked={checked}
              error={Boolean(formik?.touched?.[name] && formik?.errors?.[name])}
              helperText={formik?.touched?.[name] && formik?.errors?.[name]}
              onChange={handleChange}
              inputProps={{
                "aria-label": "controlled",
              }}
            />
          }
        />
      )}
    </>
  );
};

export default SwitchField;
