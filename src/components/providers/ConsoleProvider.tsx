"use client";
import { ProjectItemType } from "@/types/Project.type";
import React, { PropsWithChildren, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useAuthProvider } from "./AuthProvider";

const ConsoleContext = React.createContext<{
  selectedProject: ProjectItemType | undefined;
  setSelectedProject: (project: ProjectItemType) => void;
}>({
  selectedProject: undefined,
  setSelectedProject: () => {},
});

const ConsoleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedProject, setSelectedProject] = useLocalStorage<
    ProjectItemType | undefined
  >("project", undefined);

  const { session } = useAuthProvider();

  useEffect(() => {
    console.log("session", session);
  }, [session]);

  return (
    <ConsoleContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};

export default ConsoleProvider;

export const useDashboardContext = () => React.useContext(ConsoleContext);
