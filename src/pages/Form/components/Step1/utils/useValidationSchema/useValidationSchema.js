import * as Yup from "yup";

export const useValidationSchema = (props) => {
  return Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    Country: Yup.string().required("must select a country"),
    Degree: Yup.string().required("must select a degree"),
  });
};
