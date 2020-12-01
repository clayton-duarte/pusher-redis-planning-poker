import React from "react";

import Document, { NextScript, Head, Html, Main } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link href="/favicon.png" type="image/png" rel="icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
