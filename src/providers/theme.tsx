import React, { FunctionComponent } from "react";
import { Global, ThemeProvider, Theme, css } from "@emotion/react";

const Provider: FunctionComponent = ({ children }) => {
  const theme: Theme = {
    primary: "TEAL",
    secondary: "MEDIUMAQUAMARINE",
    success: "SEAGREEN",
    error: "CRIMSON",
    text: "DARKSLATEGRAY",
    bg: "WHITESMOKE",
    size: "20px",
  };

  return (
    <ThemeProvider theme={theme}>
      {children}
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
          html,
          body,
          #__next {
            font-family: "Montserrat", sans-serif;
            font-size: ${theme.size};
            background: ${theme.bg};
            color: ${theme.text};
            min-height: 100vh;
            padding: 0;
            margin: 0;
            * {
              font-family: "Montserrat", sans-serif;
              box-sizing: border-box;
            }
            @media (max-width: 768px) {
              font-size: calc(0.75 * ${theme.size});
            }
          }
        `}
      />
    </ThemeProvider>
  );
};

export default Provider;
