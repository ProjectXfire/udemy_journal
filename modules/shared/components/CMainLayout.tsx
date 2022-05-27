import React, { FC } from "react";
import Head from "next/head";
// External libraries
import { Container } from "@mui/material";
// Components
import { CSidebar } from "@modules/shared/components";

interface Props {
  children: React.ReactNode;
  title: string;
  name: string;
  content: string;
}

export const CMainLayout: FC<Props> = ({ children, title, name, content }) => {
  //******** RENDERS ********//

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
