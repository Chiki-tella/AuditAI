import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    firmId?: string | null;
  }

  interface Session {
    user: {
      role?: string;
      firmId?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    firmId?: string | null;
  }
}
