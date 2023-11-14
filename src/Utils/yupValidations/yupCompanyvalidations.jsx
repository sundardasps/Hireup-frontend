import * as Yup  from 'yup'

// const FILE_SIZE = 1920 * 1080 ;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];




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
    ).email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
  });


  export const companyFullDetailsSchema = Yup.object().shape({
    companyName: Yup.string().required("This field is required").trim(),
    companyLocation: Yup.string().required("This field is required").trim(),
    companyAddress: Yup.string().required("This field is required").trim(),
    size: Yup.string().required("This field is required").min(10,'Please enter a valid phone number').max(10,'Please enter a valid phone number').trim(),
    gstNumber: Yup.string.test('Digits only', 'digits_only', digitsOnly).required("This field is required").min(10,'Please enter a valid phone number').max(10,'Please enter a valid phone number').trim(),
    companyRoles: Yup.string()
    .matches(/[a-zA-Z]/, "At least one alphabet character required").min(10)
    .matches(/\*/, "At least one * symbol required")
    .required("At least one alphabet character and one * symbol required")
    .max(25),
  
  
    image:  Yup.mixed()
    .test('fileType', 'Only image files are allowed', (value) => {
      console.log(value,"dssfsfsfdsfhdshfdhsfhdshfdshfhishfihdsihfishihli");
        
      if (value) {
        return value && value.type.startsWith('image/');
      }
      return true;
    })
    .test('fileSize', 'File size is too large', (value) => {
      if (value) {
        return value && value.size <= 5 * 1024 * 1024; // 5 MB limit
      }
      return true;
    }).required('Image is required'),
});
  