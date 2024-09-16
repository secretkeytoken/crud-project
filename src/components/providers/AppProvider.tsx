import React, { PropsWithChildren } from "react";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "sonner";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <AppThemeProvider>{children}</AppThemeProvider>
    </>
  );
};

export default AppProvider;
