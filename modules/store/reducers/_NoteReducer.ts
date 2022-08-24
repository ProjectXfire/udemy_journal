// External libraries
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// Interfaces
import {
  INote,
  ICreateNoteDto,
  IUpdateNoteDto,
} from "@modules/notes/interfaces";
// Firebase
import { fs, db } from "@modules/firebase/config";

//******** STATE ********//

interface INoteState {
  notes: INote[];
  active: null | INote;
}

const INIT_STATE: INoteState = {
  notes: [],
  active: null,
};

//******** ASYNC METHODS ********//

export const getNotes = createAsyncThunk(
  "/note/list",
  async ({ uid }: { uid: string }) => {
    let notes: INote[] = [];
    const notesRef = fs.collection(db, `${uid}`, "journal/notes");
    const query = fs.query(notesRef, fs.orderBy("createdAt", "desc"));
    const notesSnap = await fs.getDocs(query);
    notesSnap.forEach((doc) => {
      notes.push({
        id: doc.id,
        ...(doc.data() as ICreateNoteDto),
      });
    });
    return notes;
  }
);

export const newNote = createAsyncThunk(
  "/note/create",
  async ({ uid }: { uid: string }) => {
    const newNote: ICreateNoteDto = {
      title: "",
      body: "",
      imageURL: "",
      imageId: "",
      createdAt: new Date().getTime(),
    };
    const doc = await fs.addDoc(
      fs.collection(db, `${uid}/journal/notes`),
      newNote
    );
    return {
      id: doc.id,
      ...newNote,
      imageURL: "",
    } as INote;
  }
);

export const updateNote = createAsyncThunk(
  "/note/update",
  async ({
    uid,
    noteId,
    data,
  }: {
    uid: string;
    noteId: string | undefined;
    data: IUpdateNoteDto;
  }) => {
    if (noteId) {
      const { title, body } = data;
      const noteRef = fs.doc(db, `${uid}/journal/notes`, noteId);
      await fs.updateDoc(noteRef, { title, body });
      return {
        noteId,
        ...data,
      };
    }
    return null;
  }
);

export const updateNoteImg = createAsyncThunk(
  "/note/img",
  async ({
    uid,
    noteId,
    id,
    imgFormData,
  }: {
    uid: string;
    noteId: string;
    id: string;
    imgFormData: FormData;
  }) => {
    const {
      data: { public_id, secure_url },
    } = await axios.post<{
      public_id: string;
      secure_url: string;
    }>("/api/upload", imgFormData);
    if (id) {
      await axios.delete(`/api/upload/${id}`);
    }
    const noteRef = fs.doc(db, `${uid}/journal/notes`, noteId);
    await fs.updateDoc(noteRef, { imageURL: secure_url, imageId: public_id });
    return {
      noteId,
      public_id,
      secure_url,
    };
  }
);

export const deleteNote = createAsyncThunk(
  "/note/delete",
  async ({ uid, id, noteId }: { uid: string; id: string; noteId: string }) => {
    await fs.deleteDoc(fs.doc(db, `${uid}/journal/notes`, noteId));
    if (id) {
      await axios.delete(`/api/upload/${id}`);
    }
    return noteId;
  }
);

//******** SYNC METHODS ********//

const activeNote = (state: INoteState, action: PayloadAction<INote>) => {
  state.active = action.payload;
};

const cleaning = (state: INoteState) => {
  state.active = null;
  state.notes = [];
};

//******** REDUCER ********//

export const NoteReducer = createSlice({
  name: "note",
  initialState: INIT_STATE,
  reducers: {
    setActiveNote: activeNote,
    setCleanStatus: cleaning,
  },
  extraReducers(builder) {
    builder
      .addCase(newNote.rejected, (state, action) => {
        throw new Error(action.error.message);
      })
      .addCase(newNote.fulfilled, (state, action) => {
        state.active = action.payload;
        state.notes.unshift(action.payload);
      })
      .addCase(getNotes.rejected, (state, action) => {
        throw new Error(action.error.message);
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(updateNote.rejected, (state, action) => {
        throw new Error(action.error.message);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        if (action.payload !== null) {
          const updatedNotes = state.notes.map((item) => {
            if (item.id === action.payload?.noteId) {
              return {
                ...item,
                body: action.payload.body,
                title: action.payload.title,
              };
            }
            return item;
          });
          state.notes = updatedNotes;
        }
      })
      .addCase(deleteNote.rejected, (state, action) => {
        throw new Error(action.error.message);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const updatedNotes = state.notes.filter(
          (note) => note.id !== action.payload
        );
        state.notes = updatedNotes;
        state.active = null;
      })
      .addCase(updateNoteImg.rejected, (state, action) => {
        throw new Error(action.error.message);
      })
      .addCase(updateNoteImg.fulfilled, (state, action) => {
        const { public_id, secure_url } = action.payload;
        const updatedNotes = state.notes.map((item) => {
          if (item.id === action.payload?.noteId) {
            return {
              ...item,
              imageURL: secure_url,
              imageId: public_id,
            };
          }
          return item;
        });
        state.notes = updatedNotes;
        const note = state.active as INote;
        note.imageId = public_id;
        note.imageURL = secure_url;
        state.active = note;
      });
  },
});

export const { setActiveNote, setCleanStatus } = NoteReducer.actions;
export default NoteReducer.reducer;
