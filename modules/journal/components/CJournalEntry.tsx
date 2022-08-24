import React, { useContext } from "react";
// External libraries
import { MenuBookOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
// Contexts
import { UIContext } from "@modules/shared/context";
// Components
import { CNote } from "@modules/notes/components";

export const CJournalEntry = () => {
  //******** HOOKS ********//

  const { toggleMenu } = useContext(UIContext);

  //******** RENDERS ********//

  return (
    <>
      <Box sx={{ mt: 2, mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <MenuBookOutlined sx={{ fontSize: 80 }} />
        <Typography variant="h4">Journal</Typography>
      </Box>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button type="button" variant="contained" onClick={toggleMenu}>
          Menu
        </Button>
      </Box>
      <CNote />
    </>
  );
};
