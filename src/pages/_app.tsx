import React, { FunctionComponent, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import PageTemplate from "../components/PageTemplate";
import ThemeProvider from "../providers/theme";
import RoomProvider from "../providers/room";
import UserProvider from "../providers/user";

const MyApp: FunctionComponent<AppProps> = ({
  Component: Page,
  pageProps,
  router,
}) => {
  useEffect(() => {
    // CLEAN AS PATH
    if (router.asPath.includes("#")) {
      const newPath = router.asPath.replace("#", "");
      router.replace(router.route, newPath);
    }
  }, [router.asPath]);

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

export default MyApp;
