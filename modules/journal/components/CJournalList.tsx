import React from "react";
// Components
import { CJournal } from "@modules/journal/components";
import { Box } from "@mui/material";

const j = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CJournalList = () => {
  return (
    <Box
      sx={{
        maxWidth: 400,
        minHeight: 150,
        mt: 2,
        mb: 1,
        pl: 1,
        pr: 1,
        overflow: "auto",
      }}
    >
      {j.map((item) => (
        <CJournal key={item} />
      ))}
    </Box>
  );
};
