import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

const FormHeader = (props) => {
  return (
    <Box
      data-testid="form-header"
      sx={{
        display: "flex",

        justifyContent: "space-between",

        borderBottom: "1px solid #230871",

        background: "white",

        p: 3,
      }}
    >
      <Typography
        sx={{ margin: "auto 0px" }}
        variant="h6"
        fontWeight="bold"
        color="primary.main"
      >
        {props.title}
      </Typography>

      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          data-testid="back-button"
          variant="outlined"
          color="inherit"
          disabled={props.activeStep === 0 || props?.loading}
          onClick={props.handleBack}
          sx={{ minWidth: "unset", width: "40px", borderRadius: "8px" }}
        >
          <ArrowBack />
        </Button>

        {/* {

                <Button color="inherit" onClick={props.handleSkip} sx={{ mr: 1 }}>

                    Skip

                </Button>

            } */}

        {props.activeStep !== props?.steps?.length - 1 ? (
          <>
            <Button
              data-testid="next-button"
              loading={props?.loading}
              onClick={props.handleNext}
              variant="contained"
              sx={{ minWidth: "unset", width: "40px", borderRadius: "8px" }}
            >
              <ArrowForward />
            </Button>
          </>
        ) : (
          <>
            <Button
              data-testid="submit-button"
              loading={props?.loading}
              onClick={props.handleSubmit}
              variant="contained"
              sx={{ borderRadius: "8px" }}
              disabled={props?.disabled}
            >
              {/* {RBConsts.LangConst[langCode]?.COMMON_TEXT.SUBMIT} */}
              Submit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(FormHeader);
