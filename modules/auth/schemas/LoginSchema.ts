import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().email("Must be a valid email").required("Required"),
  password: Yup.string()
    .min(8, "Must have at least 8 characters")
    .required("Required"),
});
