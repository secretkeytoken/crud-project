import React, { PropsWithChildren } from "react";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "sonner";

import { SessionProvider } from "next-auth/react";
import { ParticleConnectkit } from "../auth/connectkit";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ParticleConnectkit>
        <Toaster richColors position="bottom-right" />
        <AppThemeProvider>{children}</AppThemeProvider>
      </ParticleConnectkit>
    </SessionProvider>
  );
};

export default AppProvider;
