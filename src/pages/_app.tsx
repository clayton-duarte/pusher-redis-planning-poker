import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";

import ThemeProvider from "../providers/theme";
import RoomProvider from "../providers/room";

const App: FunctionComponent<AppProps> = ({ Component: Page, pageProps }) => (
  <ThemeProvider>
    <RoomProvider>
      <Page {...pageProps} />
    </RoomProvider>
  </ThemeProvider>
);

export default App;
