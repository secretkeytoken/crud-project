"use client";
import { useDashboardContext } from "@/components/providers/ConsoleProvider";
import React from "react";

const DashboardPage = () => {
  const { selectedProject } = useDashboardContext();
  return (
    <div className="h-screen">
      DashboardPage
      <pre>{JSON.stringify(selectedProject, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
