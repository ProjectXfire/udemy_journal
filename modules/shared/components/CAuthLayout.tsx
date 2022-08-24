import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// External libraries
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Dispatch actions & state
import { RootState } from "@modules/store";

interface Props {
  children: React.ReactNode;
  title: string;
  name: string;
  content: string;
}

export const CAuthLayout: FC<Props> = ({ children, title, name, content }) => {
  //******** HOOKS ********//

  const router = useRouter();
  const { uid } = useSelector((state: RootState) => state.auth);
  const [isLogged, setIsLogged] = useState(false);

  //******** EFFECTS ********//

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/");
      } else {
        setIsLogged(true);
      }
    });
  }, []);

  //******** RENDERS ********//

  if (!isLogged) {
    return <Container />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={name} content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Container>
    </>
  );
};
