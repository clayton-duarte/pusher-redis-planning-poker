import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import PageTemplate from "../components/PageTemplate";
import ThemeProvider from "../providers/theme";
import RoomProvider from "../providers/room";
import UserProvider from "../providers/user";

const App: FunctionComponent<AppProps> = ({ Component: Page, pageProps }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <RoomProvider>
          <PageTemplate>
            <Head>
              <title>Planning Poker</title>
            </Head>
            <Page {...pageProps} />
          </PageTemplate>
        </RoomProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
