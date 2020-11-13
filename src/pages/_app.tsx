import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";

import ThemeProvider from "../providers/theme";

const App: FunctionComponent<AppProps> = ({ Component: Page, pageProps }) => (
  <ThemeProvider>
    <Page {...pageProps} />
  </ThemeProvider>
);

export default App;
