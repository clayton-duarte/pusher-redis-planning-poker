import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";

import ThemeProvider from "../providers/theme";
import RoomProvider from "../providers/room";
import UserProvider from "../providers/user";

const App: FunctionComponent<AppProps> = ({ Component: Page, pageProps }) => (
  <ThemeProvider>
    <UserProvider>
      <RoomProvider>
        <Page {...pageProps} />
      </RoomProvider>
    </UserProvider>
  </ThemeProvider>
);

export default App;
