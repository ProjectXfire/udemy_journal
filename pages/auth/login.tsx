import React from "react";
import NextLink from "next/link";
// External libraries
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { AccountCircle, Lock, Google, GitHub } from "@mui/icons-material";
// Components
import { CAuthLayout } from "@modules/shared/components";

const Login = () => {
  //******** RENDERS ********//

  return (
    <CAuthLayout name="Login" title="Login" content="Login">
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
            <Button sx={{ mt: 1, mb: 1 }} type="submit" variant="contained">
              Login
            </Button>
            <Typography variant="body2">Login with social networks</Typography>
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
                sx={{ ml: 1, mr: 1, cursor: "pointer" }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  sx={{
                    mt: 1,
                    p: 1,
                    borderRadius: "50%",
                    display: "flex",
                    border: "1px solid white",
                  }}
                >
                  <Google sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="body2">Google</Typography>
              </Box>
              <Box
                sx={{ ml: 1, mr: 1, cursor: "pointer" }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  sx={{
                    mt: 1,
                    p: 1,
                    borderRadius: "50%",
                    display: "flex",
                    border: "1px solid white",
                  }}
                >
                  <GitHub sx={{ fontSize: 40 }} />
                </Box>
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
        </form>
      </Box>
    </CAuthLayout>
  );
};

export default Login;
