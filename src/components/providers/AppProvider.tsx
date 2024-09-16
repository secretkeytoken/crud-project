"use client";
import React, { PropsWithChildren } from "react";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "sonner";

import { SessionProvider } from "next-auth/react";
import { ParticleConnectkit } from "../auth/connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ParticleConnectkit>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position="bottom-right" />
          <AppThemeProvider>{children}</AppThemeProvider>
        </QueryClientProvider>
      </ParticleConnectkit>
    </SessionProvider>
  );
};

export default AppProvider;
