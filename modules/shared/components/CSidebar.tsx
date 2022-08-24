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
import { useSelector } from "react-redux";
// Dispatch actions & state
import {
  setStartedLoading,
  setFinishedloading,
  logoutSession,
  setCleanStatus,
  setErrorMessage,
  newNote,
} from "@modules/store/reducers";
import { RootState, useAppDispatch } from "@modules/store";
// Context
import { UIContext } from "@modules/shared/context";
// Components
import { CJournalEntries } from "@modules/journal/components";

export const CSidebar = () => {
  //******** HOOKS ********//

  const {
    state: { sidebarOpen },
    toggleMenu,
  } = useContext(UIContext);
  const router = useRouter();
  const { errorMessage, loading } = useSelector((state: RootState) => state.ui);
  const { name, uid } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  //******** METHODS ********//

  const navigateTo = (path: string) => {
    router.push(path);
    toggleMenu();
  };

  const onLogout = () => {
    dispatch(logoutSession())
      .then(() => {
        navigateTo("/auth/login");
        dispatch(setCleanStatus());
      })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  };

  const addNewNote = () => {
    dispatch(setStartedLoading());
    dispatch(newNote({ uid }))
      .then(() => {
        dispatch(setFinishedloading());
        toggleMenu();
      })
      .catch((err) => dispatch(setErrorMessage(err)));
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
            <MenuBookOutlined sx={{ mr: 1 }} /> {name}
          </Typography>
          <IconButton onClick={toggleMenu}>
            <Close />
          </IconButton>
        </Box>
        <Button
          type="button"
          sx={{ mt: 2 }}
          startIcon={<AddCircleOutlineOutlined />}
          variant="contained"
          disabled={loading}
          onClick={addNewNote}
        >
          Add new note
        </Button>
      </Box>
      <CJournalEntries />
      <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
        <ListItemButton
          sx={{ borderBottom: "1px solid grey" }}
          onClick={() => onLogout()}
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
