import * as Yup from "yup";

export const userSignUpSchema = Yup.object().shape({
    userName: Yup.string().required("This field is required").trim(),
    number: Yup.string().required("This field is required").min(10,'Please enter a valid phone number').trim(),
    email: Yup.string().email("Please enter a valid email").required("This field is required").trim(),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
      confirmPassword: Yup.string().when("password", (password, field) => {
      if (password) {
        return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
      }
    }),
  });


  export const userLogInSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required").trim(),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
  });


  export const userVarifySchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required").trim(),
  });

  
export const userResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
    .matches(/\d/, "Password should contain at least one number")
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    confirmPassword: Yup.string().when("password", (password, field) => {
    if (password) {
      return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
    }
  }),
});