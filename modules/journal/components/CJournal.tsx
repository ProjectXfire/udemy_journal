import React from "react";
// External libraries
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const texto = `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica`;

export const CJournal = () => {
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
    >
      <CardMedia
        sx={{ width: "20%", objectFit: "cover" }}
        component="img"
        image="/tasktemplate.jpg"
        alt="green iguana"
      />
      <CardContent
        sx={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          padding: 0,
          gap: 1,
        }}
      >
        <Box sx={{ width: "70%", pl: 1 }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            color="primary.main"
            variant="body1"
          >
            Un nuevo dia
          </Typography>
          <Typography
            sx={{ lineHeight: 1 }}
            color="primary.main"
            fontSize="0.7rem"
          >
            {texto.slice(0, 70)}...
          </Typography>
        </Box>
        <Box sx={{ width: "30%" }}>
          <Typography
            sx={{ lineHeight: 1, textAlign: "center" }}
            color="primary.main"
            fontSize="0.9rem"
          >
            Monday <strong>28</strong>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
