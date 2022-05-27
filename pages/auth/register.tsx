import React from "react";
import NextLink from "next/link";
// External libraries
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
// Components
import { CAuthLayout } from "@modules/shared/components";

const Register = () => {
  //******** RENDERS ********//

  return (
    <CAuthLayout name="Register" title="Register" content="Register">
      <Box sx={{ width: "100%", maxWidth: "400px" }}>
        <Typography fontWeight="bold" variant="h2">
          Journal
        </Typography>
        <form>
          <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
            <Box sx={{ mb: 1, display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                type="text"
                label="Name"
                variant="standard"
              />
            </Box>
            <Box sx={{ mb: 1, display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                type="text"
                label="Email"
                variant="standard"
              />
            </Box>
            <Box sx={{ mb: 1, display: "flex", alignItems: "flex-end" }}>
              <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="standard"
              />
            </Box>
            <Box sx={{ mb: 1, display: "flex", alignItems: "flex-end" }}>
              <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                type="password"
                label="Confirm password"
                variant="standard"
              />
            </Box>
            <Button sx={{ mt: 1, mb: 1 }} type="submit" variant="contained">
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
        </form>
      </Box>
    </CAuthLayout>
  );
};

export default Register;
