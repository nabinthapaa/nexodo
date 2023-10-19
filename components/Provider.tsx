"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  session?: SessionProviderProps["session"];
}

const Provider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
