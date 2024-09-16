"use client";
import React, { PropsWithChildren } from "react";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "sonner";

import { SessionProvider } from "next-auth/react";
import { ParticleConnectkit } from "../auth/connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";
import AuthProvider from "./AuthProvider";

const queryClient = new QueryClient();

const AppProvider: React.FC<PropsWithChildren & { session?: Session }> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session}>
      <ParticleConnectkit>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster richColors position="bottom-right" />
            <AppThemeProvider>{children}</AppThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ParticleConnectkit>
    </SessionProvider>
  );
};

export default AppProvider;
