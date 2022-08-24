import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Must be a valid email").required("Required"),
  password: Yup.string()
    .min(8, "Must have at least 8 characters")
    .required("Required"),
  repeatPassword: Yup.string()
    .required("Required")
    .min(8, "Must have at least 8 characters")
    .oneOf([Yup.ref("password")], "Password is not equal"),
});
