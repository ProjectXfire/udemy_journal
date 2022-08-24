import React, { useEffect, useRef } from "react";
// External libraries
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
// Dispatch actions & state
import { RootState, useAppDispatch } from "@modules/store";
import {
  setStartedLoading,
  setFinishedloading,
  updateNote,
  deleteNote,
  updateNoteImg,
} from "@modules/store/reducers";
// Utils
import { formattingDate } from "@utils/dateFormat";
// Components
import { CLoading } from "@modules/shared/components";

export const CNote = () => {
  //******** HOOKS ********//

  const { active } = useSelector((state: RootState) => state.note);
  const { uid } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.ui);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  //******** METHODS ********//

  const onDeleteNote = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (active) {
          dispatch(setStartedLoading());
          dispatch(deleteNote({ uid, id: active.imageId, noteId: active.id }))
            .then(() => {
              dispatch(setFinishedloading());
              Swal.fire("Deleted!", "Your note has been deleted.", "success");
            })
            .catch((err) => {
              Swal.fire("Error", "Something get wrong!!.", "error");
            });
        }
      }
    });
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (e.target.files[0].size > 200000) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Size exceed the limit of 200kb!",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    if (active) {
      dispatch(setStartedLoading());
      dispatch(
        updateNoteImg({
          uid,
          noteId: active.id,
          id: active.imageId,
          imgFormData: formData,
        })
      )
        .then(() => {
          dispatch(setFinishedloading());
          Swal.fire("Uploaded!", "Your image has been updated.", "success");
        })
        .catch((err) => {
          dispatch(setFinishedloading());
          Swal.fire("Error", "Error on load image.", "error");
        });
    }
  };

  //******** RENDERS ********//

  return (
    <>
      <Formik
        initialValues={{
          title: active?.title || "",
          body: active?.body || "",
        }}
        onSubmit={(values) => {
          dispatch(setStartedLoading());
          dispatch(updateNote({ uid, noteId: active?.id, data: values }))
            .then(() => {
              dispatch(setFinishedloading());
              Swal.fire("Saved note", active?.title, "success");
            })
            .catch((err) => {
              dispatch(setFinishedloading());
              Swal.fire("Error", "The note could not be saved.", "error");
            });
        }}
        enableReinitialize
      >
        {({ handleSubmit, getFieldProps }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardContent>
                <Typography sx={{ mb: 2 }}>
                  {formattingDate(active?.createdAt!)}
                </Typography>
                <TextField
                  sx={{ mb: 2 }}
                  variant="outlined"
                  label="Title"
                  fullWidth
                  autoFocus={true}
                  {...getFieldProps("title")}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  label="Write a note"
                  variant="outlined"
                  autoFocus={true}
                  {...getFieldProps("body")}
                />
                <Grid sx={{ mt: 2 }} container>
                  <Grid item xs={6} sm={3} lg={2}>
                    <CardMedia
                      sx={{ borderRadius: 5 }}
                      component="img"
                      width="140"
                      height="140"
                      image={
                        active?.imageURL
                          ? active?.imageURL
                          : "/tasktemplate.jpg"
                      }
                      alt="photo"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  onClick={() => inputFileRef.current?.click()}
                >
                  Picture
                </Button>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="small"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  color="error"
                  variant="contained"
                  size="small"
                  onClick={onDeleteNote}
                >
                  Delete
                </Button>
                <input
                  ref={inputFileRef}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg, image/gif"
                  onChange={uploadImage}
                />
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
      <CLoading loading={loading} />
    </>
  );
};
