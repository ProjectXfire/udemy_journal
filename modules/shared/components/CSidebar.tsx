import React, { useContext } from "react";
import { useRouter } from "next/router";
// External libraries
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Home,
  Logout,
  AddCircleOutlineOutlined,
  MenuBookOutlined,
  Close,
} from "@mui/icons-material";
// Context
import { UIContext } from "@modules/shared/context";
// Components
import { CJournalList } from "@modules/journal/components";

export const CSidebar = () => {
  //******** HOOKS ********//

  const {
    state: { sidebarOpen },
    toggleMenu,
  } = useContext(UIContext);
  const router = useRouter();

  //******** METHODS ********//

  const navigateTo = (path: string) => {
    router.push(path);
    toggleMenu();
  };

  //******** RENDERS ********//

  return (
    <Drawer
      open={sidebarOpen}
      anchor="left"
      sx={{
        backdropFilter: "blur(2px)",
        transition: "all 0.5s ease-out",
      }}
      onClose={toggleMenu}
    >
      <Box sx={{ mt: 2, ml: 1.5, mr: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="body2"
          >
            <MenuBookOutlined sx={{ mr: 1 }} /> GbDeveloper
          </Typography>
          <IconButton onClick={toggleMenu}>
            <Close />
          </IconButton>
        </Box>
        <Button
          sx={{ mt: 2 }}
          startIcon={<AddCircleOutlineOutlined />}
          variant="contained"
        >
          Add new entry
        </Button>
      </Box>
      <CJournalList />
      <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
        <ListItemButton
          sx={{ borderBottom: "1px solid grey" }}
          onClick={() => navigateTo("/")}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          sx={{ borderBottom: "1px solid grey" }}
          onClick={() => navigateTo("/")}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};
