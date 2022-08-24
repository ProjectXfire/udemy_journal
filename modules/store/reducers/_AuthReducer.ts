// External libraries
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithPopup,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// Interfaces
import { IUser, IUserDto, IUserCreateDto } from "@modules/auth/interfaces";
// Firebase config
import {
  googelAuthProvider,
  githubAuthProvider,
} from "@modules/firebase/config";

//******** STATE ********//

interface IAuthState {
  uid: string;
  name: string;
}

const INIT_STATE: IAuthState = {
  uid: "",
  name: "",
};

//******** SYNC METHODS ********//

const user = (state: IAuthState, action: PayloadAction<IUser>) => {
  state.uid = action.payload.uid;
  state.name = action.payload.name;
};

//******** ASYNC METHODS ********//

export const register = createAsyncThunk(
  "auth/register/user",
  async ({ email, password, name }: IUserCreateDto) => {
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const serializableUser = JSON.parse(JSON.stringify(user)) as User;
    return serializableUser;
  }
);

export const loginWithGoogleAuth = createAsyncThunk(
  "auth/google_auth",
  async () => {
    const auth = getAuth();
    const { user } = await signInWithPopup(auth, googelAuthProvider);
    const serializableUser = JSON.parse(JSON.stringify(user)) as User;
    return serializableUser;
  }
);

export const loginWithGithubAuth = createAsyncThunk(
  "auth/github_auth",
  async () => {
    const auth = getAuth();
    const { user } = await signInWithPopup(auth, githubAuthProvider);
    const serializableUser = JSON.parse(JSON.stringify(user)) as User;
    return serializableUser;
  }
);

export const loginWithEmailAndPassword = createAsyncThunk(
  "auth/login",
  async ({ email, password }: IUserDto) => {
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const serializableUser = JSON.parse(JSON.stringify(user)) as User;
    return serializableUser;
  }
);

export const logoutSession = createAsyncThunk("auth/logout", async () => {
  const auth = getAuth();
  await signOut(auth);
});

//******** REDUCER ********//

export const AuthReducer = createSlice({
  name: "auth",
  initialState: INIT_STATE,
  reducers: {
    setUser: user,
  },
  extraReducers(builder) {
    builder
      .addCase(register.rejected, (state, action) => {
        throw new Error(action.error.message);
      })
      .addCase(loginWithGoogleAuth.fulfilled, (state, action) => {
        if (action.payload.displayName) {
          state.name = action.payload.displayName;
          state.uid = action.payload.uid;
        }
      })
      .addCase(loginWithGithubAuth.fulfilled, (state, action) => {
        if (action.payload.displayName) {
          state.name = action.payload.displayName;
          state.uid = action.payload.uid;
        }
      })
      .addCase(loginWithGithubAuth.rejected, (state, action) => {
        throw new Error(action.error.message);
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.name = action.payload.email!;
        state.uid = action.payload.uid;
      })
      .addCase(loginWithEmailAndPassword.rejected, (state, action) => {
        if (
          action.error.code === "auth/user-not-found" ||
          action.error.code === "auth/wrong-password"
        ) {
          throw new Error("Email or password invalid");
        }
        throw new Error("Server error");
      })
      .addCase(logoutSession.fulfilled, (state, action) => {
        state.name = "";
        state.uid = "";
      })
      .addCase(logoutSession.rejected, (state, action) => {
        throw new Error(action.error.message);
      });
  },
});

export const { setUser } = AuthReducer.actions;
export default AuthReducer.reducer;
