import * as Yup from "yup";

export const useValidationSchema = (props) => {
  return Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
  });
};
