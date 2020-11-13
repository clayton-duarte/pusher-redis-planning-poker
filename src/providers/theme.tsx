import React, { FunctionComponent } from "react";
import { Global, ThemeProvider, Theme, css } from "@emotion/react";
import styled from "@emotion/styled";

const PageTemplate = styled.main`
  display: grid;
  padding: 1rem;
`;

const Provider: FunctionComponent = ({ children }) => {
  const theme: Theme = {
    primary: "TEAL",
    secondary: "LIGHTSEAGREEN",
    success: "SEAGREEN",
    error: "CRIMSON",
    text: "DARKSLATEGRAY",
    bg: "WHITESMOKE",
    size: "20px",
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTemplate>{children}</PageTemplate>
      <Global
        styles={css`
          html,
          body {
            font-family: Roboto, Ubuntu, sans-serif;
            font-size: ${theme.size};
            background: ${theme.bg};
            color: ${theme.text};
            min-height: 100%;
            padding: 0;
            margin: 0;
          }
        `}
      />
    </ThemeProvider>
  );
};

export default Provider;
