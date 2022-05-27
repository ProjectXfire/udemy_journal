import React, { useContext } from "react";
// External libraries
import { Box, IconButton, Typography } from "@mui/material";
import { CreateRounded } from "@mui/icons-material";
// Contexts
import { UIContext } from "@modules/shared/context";

export const CEmptyScreen = () => {
  //******** HOOKS ********//

  const { toggleMenu } = useContext(UIContext);

  //******** RENDERS ********//

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography textAlign="center">
          Select a journal or create a new one
        </Typography>
        <IconButton aria-label="delete" onClick={toggleMenu}>
          <CreateRounded sx={{ fontSize: 60 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
