import * as Yup from "yup";
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact:Yup.string()
  .matches(/^[0-9]+$/, "Contact number must be only digits")
  .min(10, "Contact number must be at least 10 digits")
  .max(10, "Contact number can't be more than 10 digits")
  .required("Contact number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string().required("This field is required"),
  logo: Yup.mixed()
    .required('Image is required')
    .test(
      'fileType',
      'Only .jpg, .jpeg, and .png files are allowed',
      (value:any) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),

});

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export { SignUpValidationSchema, SignInValidationSchema };
