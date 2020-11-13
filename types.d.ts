import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    text: string;
    bg: string;
    size: string;
  }
}
