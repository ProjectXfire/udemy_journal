import React, { FC, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// External libraries
import { Container } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
// Dispatch actions & state
import { RootState, useAppDispatch } from "@modules/store";
import { setUser } from "@modules/store/reducers";
// Components
import { CSidebar } from "@modules/shared/components";

interface Props {
  children: React.ReactNode;
  title: string;
  name: string;
  content: string;
}

export const CMainLayout: FC<Props> = ({ children, title, name, content }) => {
  //******** HOOKS ********//

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { uid } = useSelector((state: RootState) => state.auth);

  //******** EFFECTS ********//

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ name: user.email!, uid: user.uid }));
      } else {
        router.replace("/auth/login");
      }
    });
  }, []);

  //******** RENDERS ********//

  if (!uid) {
    return <Container />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={name} content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CSidebar />
      <Container>{children}</Container>
    </>
  );
};
