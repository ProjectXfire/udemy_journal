import React from "react";
// External libraries
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  Box,
  Grid,
} from "@mui/material";
// Utils
import { formattingDate } from "@utils/dateFormat";

export const CNote = () => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ mb: 2 }}>
          {formattingDate(new Date().toString())}
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={10}
          label="Write a note"
          variant="outlined"
        />
        <Grid sx={{ mt: 2 }} container>
          <Grid item xs={6} sm={3} lg={2}>
            <CardMedia
              sx={{ borderRadius: 5 }}
              component="img"
              width="140"
              height="140"
              image="/tasktemplate.jpg"
              alt="photo"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="button" variant="contained" size="small">
          Picture
        </Button>
        <Button type="button" variant="contained" size="small">
          Save
        </Button>
      </CardActions>
    </Card>
  );
};
