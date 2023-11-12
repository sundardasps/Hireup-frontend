import * as Yup from "yup";

export const titleValidationSchema = Yup.object().shape({
    title: Yup.string().required("This field is required").min(5).max(20).trim()
});
