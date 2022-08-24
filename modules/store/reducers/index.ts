// UI Reducer

export { default as UIReducer } from "./_UIReducer";
export {
  setErrorMessage,
  setFinishedloading,
  setStartedLoading,
} from "./_UIReducer";

// Auth reducer

export { default as AuthReducer } from "./_AuthReducer";
export {
  setUser,
  logoutSession,
  loginWithGoogleAuth,
  loginWithGithubAuth,
  loginWithEmailAndPassword,
  register,
} from "./_AuthReducer";

// Note reducer

export { default as NoteReducer } from "./_NoteReducer";
export {
  setActiveNote,
  setCleanStatus,
  newNote,
  deleteNote,
  getNotes,
  updateNote,
  updateNoteImg,
} from "./_NoteReducer";
