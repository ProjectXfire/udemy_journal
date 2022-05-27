export interface UIState {
  sidebarOpen: boolean;
}

export const INIT_STATE: UIState = {
  sidebarOpen: false,
};

type UIAction = {
  type: "toogle";
};

export const UIReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "toogle":
      return { ...state, sidebarOpen: !state.sidebarOpen };

    default:
      return state;
  }
};
