import React from "react";
// External libraries
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
// Dispatch actions & state
import { RootState } from "@modules/store";
// Components
import { CJournal } from "@modules/journal/components";

export const CJournalEntries = () => {
  //******** HOOKS ********//

  const { notes } = useSelector((state: RootState) => state.note);

  //******** RENDERS ********//

  return (
    <Box
      sx={{
        maxWidth: 400,
        mt: 2,
        mb: 1,
        pl: 1,
        pr: 1,
        overflow: "auto",
      }}
    >
      {notes.map((item) => (
        <CJournal key={item.id} note={item} />
      ))}
    </Box>
  );
};
