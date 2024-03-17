import * as React from "react";
const Step1 = React.lazy(() => import("./Step1/Step1"));
const Step2 = React.lazy(() => import("./Step2/Step2"));
const Step3 = React.lazy(() => import("./Step3/Step3"));
const Step4 = React.lazy(() => import("./Step4/Step4"));
const FormHeader = React.lazy(() => import("./FormHeader/FormHeader"));

export { Step1, Step2, Step3, Step4, FormHeader };
