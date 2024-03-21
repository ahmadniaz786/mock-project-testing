import * as Yup from "yup";

export const useValidationSchema = (props) => {
  return Yup.object().shape({
    COMMERCIAL_NAME_LINE_1_A: Yup.string().required("COMMERCIAL_NAME_LINE_1_A is required")
  });
};
