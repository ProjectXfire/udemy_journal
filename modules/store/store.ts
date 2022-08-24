// External libraries
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// Reducers
import { UIReducer, AuthReducer, NoteReducer } from "@modules/store/reducers";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    ui: UIReducer,
    note: NoteReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
