"use client";
import { ProjectItemType } from "@/types/Project.type";
import React, { PropsWithChildren } from "react";
import { useLocalStorage } from "usehooks-ts";

const DashboardContext = React.createContext<{
  selectedProject: ProjectItemType | undefined;
  setSelectedProject: (project: ProjectItemType) => void;
}>({
  selectedProject: undefined,
  setSelectedProject: () => {},
});

const DashboardProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedProject, setSelectedProject] = useLocalStorage<
    ProjectItemType | undefined
  >("project", undefined);

  return (
    <DashboardContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;

export const useDashboardContext = () => React.useContext(DashboardContext);
