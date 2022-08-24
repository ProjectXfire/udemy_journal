import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import React, { FC } from "react";

interface Props {
  loading: boolean;
}

export const CLoading: FC<Props> = ({ loading }) => {
  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={loading}
    >
      <Box
        sx={{
          width: 200,
          pt: 2,
          pb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "black",
          borderRadius: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Processing...</Typography>
      </Box>
    </Modal>
  );
};
