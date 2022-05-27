import { createContext, FC, useReducer } from "react";
// Reducer
import { UIReducer, INIT_STATE, UIState } from "./UIReducer";

interface UIContextProps {
  state: UIState;
  toggleMenu: () => void;
}

export const UIContext = createContext({} as UIContextProps);

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  //******** HOOKS ********//

  const [state, dispatch] = useReducer(UIReducer, INIT_STATE);

  //******** METHODS ********//

  const toggleMenu = () => {
    dispatch({ type: "toogle" });
  };

  //******** RENDERS *********//

  return (
    <UIContext.Provider value={{ state, toggleMenu }}>
      {children}
    </UIContext.Provider>
  );
};
