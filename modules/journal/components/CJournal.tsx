import React, { FC, useContext } from "react";
// External libraries
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
// Intefaces
import { INote } from "@modules/notes/interfaces";
// Dispatch actions & state
import { RootState, useAppDispatch } from "@modules/store";
import { setActiveNote } from "@modules/store/reducers";
// Context
import { UIContext } from "@modules/shared/context";
// Utils
import { getDay, getMonth } from "@utils/dateFormat";

interface Props {
  note: INote;
}

export const CJournal: FC<Props> = ({ note }) => {
  //******** HOOKS ********//

  const dispatch = useAppDispatch();
  const { toggleMenu } = useContext(UIContext);

  //******** METHODS ********//

  const selectANote = () => {
    dispatch(setActiveNote(note));
    toggleMenu();
  };

  //******** RENDERS ********//

  return (
    <Card
      className="card_hover"
      sx={{
        width: "100%",
        maxWidth: "280px",
        height: 80,
        display: "flex",
        mb: 1,
        bgcolor: "white",
        cursor: "pointer",
      }}
      onClick={selectANote}
    >
      <CardMedia
        sx={{ width: "20%", objectFit: "cover" }}
        component="img"
        image={note.imageURL ? note.imageURL : "/tasktemplate.jpg"}
        alt="green iguana"
      />
      <CardContent
        sx={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          padding: "0px !important",
          gap: 1,
        }}
      >
        <Box sx={{ width: "70%", pl: 1 }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            color="primary.main"
            variant="body1"
          >
            {note.title.length <= 16
              ? note.title
              : `${note.title.slice(0, 16)}...`}
          </Typography>
          <Typography
            sx={{ lineHeight: 1 }}
            color="primary.main"
            fontSize="0.7rem"
          >
            {note.body.length <= 70
              ? note.body
              : `${note.body.slice(0, 70)}...`}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography
            sx={{ lineHeight: 1, textAlign: "center" }}
            color="primary.main"
            fontSize="0.9rem"
          >
            {getMonth(note.createdAt)}
          </Typography>
          <Typography
            sx={{ lineHeight: 1, textAlign: "center" }}
            color="primary.main"
            fontSize="0.9rem"
          >
            <strong>{getDay(note.createdAt)}</strong>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
