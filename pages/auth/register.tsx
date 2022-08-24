import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
// External libraries
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
// Dispatch actions & state
import {
  register,
  setErrorMessage,
  setStartedLoading,
  setFinishedloading,
} from "@modules/store/reducers";
import { RootState, useAppDispatch } from "@modules/store";
// Schemas
import { RegisterSchema } from "@modules/auth/schemas";
// Components
import { CAuthLayout } from "@modules/shared/components";

const Register = () => {
  //******** HOOKS ********//

  const router = useRouter();
  const { loading, errorMessage } = useSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();

  //******** RENDERS ********//

  return (
    <CAuthLayout name="Register" title="Register" content="Register">
      <Box className="fadeIn" sx={{ width: "100%", maxWidth: "400px" }}>
        <Typography fontWeight="bold" variant="h2">
          Journal
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            const { email, password, name } = values;
            dispatch(setStartedLoading());
            dispatch(register({ email, password, name }))
              .then(() => {
                dispatch(setFinishedloading());
                router.push("/auth/login");
              })
              .catch((err) => dispatch(setErrorMessage(err.message)));
          }}
        >
          {({ handleSubmit, getFieldProps, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                <Box sx={{ mb: 1, display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    disabled={loading}
                    fullWidth
                    type="text"
                    label="Name"
                    variant="standard"
                    {...getFieldProps("name")}
                    error={!!errors.name}
                    helperText={touched.name && errors.name && errors.name}
                  />
                </Box>
                <Box sx={{ mb: 1, display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    disabled={loading}
                    fullWidth
                    type="text"
                    label="Email"
                    variant="standard"
                    {...getFieldProps("email")}
                    error={!!errors.email}
                    helperText={touched.email && errors.email && errors.email}
                  />
                </Box>
                <Box sx={{ mb: 1, display: "flex", alignItems: "flex-end" }}>
                  <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    disabled={loading}
                    fullWidth
                    type="password"
                    label="Password"
                    variant="standard"
                    {...getFieldProps("password")}
                    error={!!errors.password}
                    helperText={
                      touched.password && errors.password && errors.password
                    }
                  />
                </Box>
                <Box sx={{ mb: 1, display: "flex", alignItems: "flex-end" }}>
                  <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    disabled={loading}
                    fullWidth
                    type="password"
                    label="Confirm password"
                    variant="standard"
                    {...getFieldProps("repeatPassword")}
                    error={!!errors.repeatPassword}
                    helperText={
                      touched.repeatPassword &&
                      errors.repeatPassword &&
                      errors.repeatPassword
                    }
                  />
                </Box>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <Button
                  sx={{ mt: 1, mb: 1 }}
                  disabled={loading}
                  type="submit"
                  variant="contained"
                >
                  Register
                </Button>
                <Typography variant="body2">
                  If you already have an account please click{" "}
                  <NextLink href="/auth/login">
                    <Link sx={{ cursor: "pointer" }} underline="none">
                      here
                    </Link>
                  </NextLink>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </CAuthLayout>
  );
};

export default Register;
