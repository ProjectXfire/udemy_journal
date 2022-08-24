// External libraries
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//******** STATE ********//

interface IUIState {
  loading: boolean;
  errorMessage: undefined | string;
}

const INIT_STATE: IUIState = {
  loading: false,
  errorMessage: undefined,
};

//******** SYNC METHODS ********//

const errorMessage = (
  state: IUIState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.errorMessage = action.payload;
};

const startedloading = (state: IUIState) => {
  state.loading = true;
  state.errorMessage = undefined;
};

const finishedloading = (state: IUIState) => {
  state.loading = false;
};

//******** REDUCER ********//

export const UIReducer = createSlice({
  name: "ui",
  initialState: INIT_STATE,
  reducers: {
    setErrorMessage: errorMessage,
    setStartedLoading: startedloading,
    setFinishedloading: finishedloading,
  },
});

export const { setErrorMessage, setStartedLoading, setFinishedloading } =
  UIReducer.actions;
export default UIReducer.reducer;
