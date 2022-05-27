import type { NextPage } from "next";
// Components
import { CMainLayout } from "@modules/shared/components";
import { CEmptyScreen, CWritingJournal } from "@modules/journal/components";

const empty = false;

const Home: NextPage = () => {
  return (
    <CMainLayout title="Journal" name="Journal" content="Journal">
      {empty ? <CEmptyScreen /> : <CWritingJournal />}
    </CMainLayout>
  );
};

export default Home;
