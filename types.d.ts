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
  type Points =
    | "0"
    | "1"
    | "2"
    | "3"
    | "5"
    | "8"
    | "13"
    | "20"
    | "40"
    | "100"
    | "skip";

  export interface User {
    lastVote?: Points;
    email: string;
    image: string;
    name: string;
  }

  export interface Room {
    reveal?: boolean;
    rounds: Points[];
    members: User[];
    host: User;
    id: string;
  }
}
