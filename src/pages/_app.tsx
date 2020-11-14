import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";

import PageTemplate from "../components/PageTemplate";
import ThemeProvider from "../providers/theme";
import RoomProvider from "../providers/room";
import UserProvider from "../providers/user";

const App: FunctionComponent<AppProps> = ({ Component: Page, pageProps }) => (
  <ThemeProvider>
    <UserProvider>
      <RoomProvider>
        <PageTemplate>
          <Page {...pageProps} />
        </PageTemplate>
      </RoomProvider>
    </UserProvider>
  </ThemeProvider>
);

export default App;
