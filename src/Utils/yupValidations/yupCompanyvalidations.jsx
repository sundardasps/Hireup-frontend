import * as Yup  from 'yup'

const MAX_FILE_SIZE = 10485760; // 10 MB in bytes (10 * 1024 * 1024)
const imageFormats = ["image/jpeg", "image/png", "image/avif"];





export const companySignUpSchema = Yup.object().shape({
    companyName: Yup.string().required("This field is required").trim(),
    number: Yup.string().required("This field is required").min(10,'Please enter a valid phone number').max(10,'Please enter a valid phone number').trim(),
    email: Yup.string().matches(/^[\w.-]+@[\w.-]+\.\w+$/,"Please enter a valid email"
    ).email("Please enter a valid email").required("This field is required").trim(),
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


  export const companyLoginSchema = Yup.object().shape({
    email: Yup.string().matches(/^[\w.-]+@[\w.-]+\.\w+$/,"Please enter a valid email"
    ).email("Please enter a valid email").required("This field is required").trim(),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character").trim(),
  });


  export const companyFullDetailsSchema = Yup.object().shape({
    companyName: Yup.string().required("This field is required").trim(),
    companyLocation: Yup.string().required("This field is required").trim(),
    companyAddress: Yup.string().required("This field is required").trim(),
    size: Yup.string().required("This field is required").min(1,'Add minimus size').max(5,'Please enter a valid size').trim(),
    gstNumber: Yup.string().matches('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$',"Please enter a valid Gst number"
    ).required("This field is required").trim(),
    companyRoles: Yup.string()
    .matches(/[a-zA-Z]/, "At least one alphabet character required").min(10)
    // .matches(/\*/, "At least one * symbol required")
    .required("At least one alphabet character and one * symbol required")
    .max(500),
    image:Yup.mixed()
    .test("is-image", "Only image files are allowed", (value) => {
      if (value) {
        return imageFormats.includes(value.type);
      }
      return true;
    })
    .required("choose a Photo")
    .test(
      "is-valid-size",
      "Max allowed size is 10 mb",
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
});

export const companyFullDetailsEditSchema = Yup.object().shape({
  companyName: Yup.string().required("This field is required").trim(),
  companyLocation: Yup.string().required("This field is required").trim(),
  companyAddress: Yup.string().required("This field is required").trim(),
  size: Yup.string().required("This field is required").min(1,'Please enter a valid size').max(5,'Please enter a valid size').trim(),
  gstNumber: Yup.string().matches('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$',"Please enter a valid Gst number"
  ).required("This field is required").trim(),
  companyRoles: Yup.string()
  .matches(/[a-zA-Z]/, "At least one alphabet character required").min(10)
  // .matches(/\*/, "At least one * symbol required")
  .required("At least one alphabet character and one * symbol required")
  .max(500),
  number: Yup.string().required("This field is required").min(10,'Please enter a valid phone number').max(10,'Please enter a valid phone number').trim(),
});
  

export const companyPostSchema = Yup.object().shape({
  jobPosition: Yup.string().required("This field is required").trim(),
  skills: Yup.string().required("This field is required").trim(),
  experience: Yup.string().required("This field is required").min(1,'Please enter a valid size').trim(),
  jobType: Yup.string().required("This field is required").trim(),
  responsibilities: Yup.string().required("This field is required").trim(),
  endTime:  Yup.date()
  .required('Date is required')
  .min(new Date(), 'Date must be in the future'),
  salery:Yup.string().required("This field is required").trim()
});


export const imageEditSchema = Yup.object().shape({
  image:Yup.mixed()
  .test("is-image", "Only image files are allowed", (value) => {
    if (value) {
      return imageFormats.includes(value.type);
    }
    return true;
  }).required("Choose a Photo")
  .test(
    "is-valid-size",
    "Max allowed size is 10 mb",
    (value) => value && value.size <= MAX_FILE_SIZE
  ),
});