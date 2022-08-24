import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
// External libraries
import {
  Alert,
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle, Lock, Google, GitHub } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
// Dispatch actions & state
import {
  loginWithGoogleAuth,
  loginWithGithubAuth,
  loginWithEmailAndPassword,
  setStartedLoading,
  setFinishedloading,
  setErrorMessage,
} from "@modules/store/reducers";
import { RootState, useAppDispatch } from "@modules/store";
// Schemas
import { LoginSchema } from "@modules/auth/schemas";
// Components
import { CAuthLayout } from "@modules/shared/components";

const Login = () => {
  //******** HOOKS ********//

  const { loading, errorMessage } = useSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //******** METHODS ********//

  const onGoogleLogin = () => {
    dispatch(setStartedLoading());
    dispatch(loginWithGoogleAuth())
      .then(() => {
        dispatch(setFinishedloading());
        router.replace("/");
      })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  };

  const onGithubLogin = () => {
    dispatch(setStartedLoading());
    dispatch(loginWithGithubAuth())
      .then(() => {
        dispatch(setFinishedloading());
        router.replace("/");
      })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  };

  //******** RENDERS ********//

  return (
    <CAuthLayout name="Login" title="Login" content="Login">
      <Box className="fadeIn" sx={{ width: "100%", maxWidth: "400px" }}>
        <Typography fontWeight="bold" variant="h2">
          Journal
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            dispatch(setStartedLoading());
            dispatch(loginWithEmailAndPassword(values))
              .then(() => {
                dispatch(setFinishedloading());
                router.replace("/");
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
                <Button
                  disabled={loading}
                  sx={{ mt: 1, mb: 1 }}
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
                {errorMessage && (
                  <Alert sx={{ mt: 1, mb: 1 }} severity="error">
                    {errorMessage}
                  </Alert>
                )}
                <Typography variant="body2">
                  Login with social networks
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    mb: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    border: "1px solid white",
                    borderRadius: 5,
                  }}
                >
                  <Box
                    sx={{ ml: 1, mr: 1 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <IconButton
                      sx={{
                        mt: 1,
                        p: 1,
                        borderRadius: "50%",
                        display: "flex",
                        border: "1px solid white",
                      }}
                      disabled={loading}
                      color="primary"
                      onClick={onGoogleLogin}
                    >
                      <Google sx={{ fontSize: 40, color: "white" }} />
                    </IconButton>
                    <Typography variant="body2">Google</Typography>
                  </Box>
                  <Box
                    sx={{ ml: 1, mr: 1 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <IconButton
                      sx={{
                        mt: 1,
                        p: 1,
                        borderRadius: "50%",
                        display: "flex",
                        border: "1px solid white",
                      }}
                      disabled={loading}
                      color="primary"
                      onClick={onGithubLogin}
                    >
                      <GitHub sx={{ fontSize: 40, color: "white" }} />
                    </IconButton>
                    <Typography variant="body2">Github</Typography>
                  </Box>
                </Box>
                <Typography variant="body2">
                  If you do not have an account please click{" "}
                  <NextLink href="/auth/register">
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

export default Login;
