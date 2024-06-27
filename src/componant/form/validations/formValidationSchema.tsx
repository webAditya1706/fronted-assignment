import { title } from "process";
import * as Yup from "yup";
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  email: Yup.string().email("Invalid email").required("This field is required"),
  contact: Yup.string()
    .matches(/^[0-9]+$/, "Contact number must be only digits")
    .min(10, "Contact number must be at least 10 digits")
    .max(10, "Contact number can't be more than 10 digits")
    .required("This field is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string().required("This field is required"),
  logo: Yup.mixed()
    .required('This field is required')
    .test(
      'fileType',
      'Only .jpg, .jpeg, and .png files are allowed',
      (value: any) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),

});

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const UpdateUserValidationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact: Yup.string()
    .matches(/^[0-9]+$/, "Contact number must be only digits")
    .min(10, "Contact number must be at least 10 digits")
    .max(10, "Contact number can't be more than 10 digits")
    .required("Contact number is required"),
  logo: Yup.mixed()
    .required('This field is required')
    .test(
      'fileType',
      'Only .jpg, .jpeg, and .png files are allowed',
      (value: any) => {
        if (!value) return true; // Allow no value
        if (typeof value === 'string') return true; // Allow URL strings
        return SUPPORTED_FORMATS.includes(value.type);
      }),
});

const ProductValidationSchema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  price: Yup.string()
    .matches(/^[0-9]+$/, "Price must be only digits")
    .required("This field is required"),
  image: Yup.mixed()
    .test('fileType', 'Only .jpg, .jpeg, and .png files are allowed', (value: any) => {
      if (typeof value === 'string') {
        // If value is a string, assume it's a valid URL and bypass file type check
        return true;
      }
      // Otherwise, check the file type
      return value && SUPPORTED_FORMATS.includes(value.type);
    }),
});




export { SignUpValidationSchema, SignInValidationSchema, UpdateUserValidationSchema, ProductValidationSchema };
