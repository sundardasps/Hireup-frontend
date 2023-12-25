import * as Yup from "yup";

const MAX_FILE_SIZE = 10485760; // 10 MB in bytes (10 * 1024 * 1024)
const imageFormats = ["image/jpeg", "image/png", "image/avif", "application/pdf"];

export const userSignUpSchema = Yup.object().shape({
  userName: Yup.string().required("This field is required").trim(),
  number: Yup.string()
    .required("This field is required")
    .min(10, "Please enter a valid phone number")
    .max(10, "Please enter a valid phone number")
    .trim(),
  email: Yup.string()
    .matches(/^[\w.-]+@[\w.-]+\.\w+$/, "Please enter a valid email")
    .email("Please enter a valid email")
    .required("This field is required")
    .trim(),
  password: Yup.string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      "Password ahould contain at least one uppercase and lowercase character"
    )
    .matches(/\d/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "Password should contain at least one special character"
    ),
  confirmPassword: Yup.string().when("password", (password, field) => {
    if (password) {
      return field
        .required("The passwords do not match")
        .oneOf([Yup.ref("password")], "The passwords do not match");
    }
  }),
});

export const userLogInSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[\w.-]+@[\w.-]+\.\w+$/, "Please enter a valid email")
    .email("Please enter a valid email")
    .required("This field is required")
    .trim(),
  password: Yup.string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      "Password ahould contain at least one uppercase and lowercase character"
    )
    .matches(/\d/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "Password should contain at least one special character"
    ),
});

export const userVarifySchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[\w.-]+@[\w.-]+\.\w+$/, "Please enter a valid email")
    .email("Please enter a valid email")
    .required("This field is required")
    .trim(),
});

export const userResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      "Password ahould contain at least one uppercase and lowercase character"
    )
    .matches(/\d/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "Password should contain at least one special character"
    ),
  confirmPassword: Yup.string().when("password", (password, field) => {
    if (password) {
      return field
        .required("The passwords do not match")
        .oneOf([Yup.ref("password")], "The passwords do not match");
    }
  }),
});


export const userEditSchema = Yup.object().shape({
  name: Yup.string().required("This field is required").trim(),
  number: Yup.string()
    .required("This field is required")
    .min(10, "Please enter a valid phone number")
    .max(10, "Please enter a valid phone number")
    .trim(),
    title:Yup.string().required("This field is required").trim(),
    place:Yup.string().required("This field is required").trim()
});

export const userExperienceSchema = Yup.object().shape({
  experience: Yup.string().required("This field is required").trim(),
});


export const educationAddSchema = Yup.object().shape({
  universityName: Yup.string().required("This field is required").trim(),
  courseName: Yup.string().required("This field is required").trim(),
  courseStarted:  Yup.date()
  .required('Date is required'),
  courseEnded: Yup.date()
  .required('End date is required')
  .test(
    'date-validation',
    'End date must be greater than start date',
    function (value) {
      const { courseStarted } = this.parent;
      return !courseStarted || !value || new Date(value) > new Date(courseStarted);
    }
  )
  .test(
    'date-equality',
    'Start date and end date cannot be the same',
    function (value) {
      const { courseStarted } = this.parent;
      return !courseStarted || !value || new Date(value) !== new Date(courseStarted);
    }
  ),
});


export const resumeSchema = Yup.object().shape({
  resume:Yup.mixed()
  .test("is-image", "Only image files are allowed", (value) => {
    if (value) {
      return imageFormats.includes(value.type);
    }
    return true;
  }).required("Please select resume")
  .test(
    "is-valid-size",
    "Max allowed size is 10 mb",
    (value) => value && value.size <= MAX_FILE_SIZE
  ),
});

export const resumeUploadedSchema = Yup.object().shape({
  resume:Yup.string().required("Please choose a resume").trim(),
});