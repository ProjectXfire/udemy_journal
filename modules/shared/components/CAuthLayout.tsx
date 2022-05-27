import React, { FC } from "react";
import Head from "next/head";
// External libraries
import { Container } from "@mui/material";

interface Props {
  children: React.ReactNode;
  title: string;
  name: string;
  content: string;
}

export const CAuthLayout: FC<Props> = ({ children, title, name, content }) => {
  //******** RENDERS ********//

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
