import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
// External libraries
import { ThemeProvider, CssBaseline } from "@mui/material";
// Providers
import { UIProvider } from "@modules/shared/context";
import { Provider as ReduxProvider } from "react-redux";
// Store
import { store } from "@modules/store";
// Themes
import { basicTheme } from "@styles/themes";

const MyProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <UIProvider>{children}</UIProvider>
    </ReduxProvider>
  );
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
