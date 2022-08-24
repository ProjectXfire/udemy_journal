import type { NextPage } from "next";
import { useEffect } from "react";
// External libraries
import { useSelector } from "react-redux";
// Dispatch actions & state
import { RootState, useAppDispatch } from "@modules/store";
import {
  getNotes,
  setErrorMessage,
  setStartedLoading,
  setFinishedloading,
} from "@modules/store/reducers";
// Components
import { CMainLayout } from "@modules/shared/components";
import { CEmptyScreen, CJournalEntry } from "@modules/journal/components";

const Home: NextPage = () => {
  //******** HOOKS ********//

  const { active } = useSelector((state: RootState) => state.note);
  const { uid } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  //******** EFFECTS ********//

  useEffect(() => {
    if (uid) {
      dispatch(setStartedLoading());
      dispatch(getNotes({ uid }))
        .then(() => dispatch(setFinishedloading()))
        .catch((err) => dispatch(setErrorMessage(err.message)));
    }
  }, [dispatch, uid]);

  //******** RENDERS ********//

  return (
    <CMainLayout title="Journal" name="Journal" content="Journal">
      {!active ? <CEmptyScreen /> : <CJournalEntry />}
    </CMainLayout>
  );
};

export default Home;
