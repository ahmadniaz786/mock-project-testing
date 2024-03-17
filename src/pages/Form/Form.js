import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  Button,
  styled,
  Skeleton,
  Grid,
} from "@mui/material";
import { Step1, Step2, Step3, Step4, FormHeader } from "./components";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StepLabel from "@mui/material/StepLabel";
import { CircularProgress } from "@mui/material";

const IcrmConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const IcrmStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .IcrmStepIcon-completedIcon": {
    color: theme.palette.secondary.main,
    zIndex: 1,
    fontSize: 24,
  },
  "& .IcrmStepIcon-circle": {
    width: 22,
    height: 22,
    borderRadius: "50%",
    backgroundColor: "#eaeaf0",
    textAlign: "center",
    paddingTop: "4px",
    color: "#ffffff",
  },
  "& .IcrmStepIcon-circle-active": {
    width: 22,
    height: 22,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    paddingTop: "4px",
    color: "#ffffff",
  },
}));

const IcrmStepIcon = (props) => {
  const { active, completed, className, icon } = props;
  let customIcon;
  if (active) {
    customIcon = (
      <IcrmStepIconRoot ownerState={active} className={className}>
        <div className="IcrmStepIcon-circle-active">{icon}</div>
      </IcrmStepIconRoot>
    );
  } else if (completed) {
    customIcon = (
      <IcrmStepIconRoot ownerState={active} className={className}>
        <CheckCircleOutlineIcon className="IcrmStepIcon-completedIcon" />
      </IcrmStepIconRoot>
    );
  } else {
    customIcon = (
      <IcrmStepIconRoot ownerState={active} className={className}>
        <div className="IcrmStepIcon-circle">{icon}</div>
      </IcrmStepIconRoot>
    );
  }
  return customIcon;
};

const DataForm = () => {
  const [loading, setLoading] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const stepsArray = [
    {
      name: "First Step",
      label: "Step 1",
      form: Step1,
      completed: false,
    },
    {
      name: "Second Step",
      label: "Step 2",
      form: Step2,
      completed: false,
    },
    {
      name: "Third Step",
      label: "Step 3",
      form: Step3,
      completed: false,
    },
    {
      name: "Four Step",
      label: "Step 4",
      form: Step4,
      completed: false,
    },
  ];

  useEffect(() => {
    setActiveForm(stepsArray[activeStep]?.form);
  }, [activeStep, stepsArray]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const setFormSteps = useCallback((currentStep) => {
    stepsArray.forEach((item, index) => {
      if (index++ < parseInt(currentStep)) {
        item.completed = true;
      }
    });
  }, []);

  const next = () => {
    setFormSteps(activeStep);
    setActiveStep((prevStep) => prevStep + 1);
  };

  const prev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log("SubmitTrigger");
  };

  const getComponentName = () => {
    return activeForm;
  };

  return (
    <Box pt={1}>
      <Grid container sm={12} pt={2}>
        <Grid xs={4} sm={3} md={2} sx={{ pr: 2, height: "auto" }}>
          {loading ? (
            <Skeleton
              variant="rounded"
              sx={{
                width: "100%",
                height: "calc(100vh - 175px)",
                WebkitTransform: "none",
              }}
            />
          ) : (
            <Box sx={{ background: "white", height: "fit-content" }}>
              <Stepper
                nonLinear
                activeStep={activeStep}
                orientation="vertical"
                connector={<IcrmConnector />}
                sx={{ borderRadius: "5px", p: 3 }}
              >
                {stepsArray.map((item, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step
                      completed={index < activeStep ? true : false}
                      key={item.label}
                      {...stepProps}
                    >
                      <StepButton
                        {...labelProps}
                        sx={{ width: "100px" }}
                        disabled={!item.completed}
                      >
                        <StepLabel StepIconComponent={IcrmStepIcon}>
                          {item.label}
                        </StepLabel>
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
          )}
        </Grid>
        <Grid xs={8} sm={9} md={10} position="relative">
          <React.Suspense
            fallback={
              <Box
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  tranform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            {activeStep === stepsArray.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button variant="contained">Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: "calc(100vh - 175px)",
                      WebkitTransform: "none",
                    }}
                  />
                ) : (
                  <Box>
                    <FormHeader
                      loading={loading}
                      handleBack={prev}
                      handleNext={next}
                      activeStep={activeStep}
                      title={stepsArray[activeStep].label}
                      steps={stepsArray}
                    />
                    {activeForm &&
                      React.createElement(getComponentName(), {
                        activeStep: activeStep,
                        handleSubmit: handleSubmit,
                        steps: stepsArray,
                        loading: loading,
                      })}
                  </Box>
                )}
              </React.Fragment>
            )}
          </React.Suspense>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataForm;
