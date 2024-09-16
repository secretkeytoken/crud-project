import Navbar from "@/components/layout/Navbar";
import React, { PropsWithChildren } from "react";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full">{children}</div>
    </>
  );
};

export default DashboardLayout;
