import "../styles/globals.css";
import type { AppProps } from "next/app";
// External libraries
import { ThemeProvider, CssBaseline } from "@mui/material";
// Providers
import { UIProvider } from "@modules/shared/context";
// Themes
import { basicTheme } from "@styles/themes";
import React from "react";

const MyProviders = ({ children }: { children: React.ReactNode }) => {
  return <UIProvider>{children}</UIProvider>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyProviders>
      <ThemeProvider theme={basicTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </MyProviders>
  );
}

export default MyApp;
