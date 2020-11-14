import "@emotion/react";
import "next";

import { Session } from "next-iron-session";

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

declare module "next" {
  export interface NextApiRequest {
    session: Session;
  }
}

declare global {
  export interface Room {
    host?: string;
    id?: string;
  }
}
