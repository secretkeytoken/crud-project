"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronsUpDown, Copy, List, Plus } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import useProjects from "@/hooks/useProjects";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDashboardContext } from "../providers/ConsoleProvider";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
const ProjectSelection: React.FC<Props> = ({ className }) => {
  const { selectedProject, setSelectedProject } = useDashboardContext();
  const [, copyToClipboard] = useCopyToClipboard();
  const [open, setOpen] = React.useState(false);
  const { data: projects } = useProjects();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          aria-expanded={open}
          className={cn(
            "w-[256px] justify-between flex items-center h-16 hover:bg-lightGreen cursor-pointer p-3 border-b border-lightGreen text-white select-none",
            className
          )}
        >
          <div className="flex items-center gap-2">
            {selectedProject ? (
              <>
                <Avatar>
                  <AvatarFallback className="uppercase">
                    {selectedProject?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <h3 className="font-semibold">{selectedProject.name}</h3>
                  <span
                    className="text-muted-foreground cursor-pointer hover:text-white/80 flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(selectedProject.id);
                      toast.success("Project ID copied to clipboard");
                    }}
                  >
                    <Copy className="size-3" />
                    {selectedProject.id}
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* <Avatar>
                  <AvatarFallback className="uppercase">PJ</AvatarFallback>
                </Avatar> */}
                <div className="text-sm">
                  <h3 className="font-semibold">Select a project</h3>
                  <span className="text-muted-foreground">---</span>
                </div>
              </>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[256px] p-1">
        <Command>
          <CommandGroup heading="Projects">
            <CommandList>
              {projects?.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => {
                    setSelectedProject(project);
                    setOpen((prev) => !prev);
                  }}
                  className="group cursor-pointer"
                >
                  <div className="p-1 flex items-center gap-2 w-full">
                    <Avatar className="size-6">
                      <AvatarFallback className="uppercase group-hover:bg-darkGreen">
                        {project.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{project.name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandList>
              <CommandItem className="group">
                <div className="p-1 flex items-center gap-2 text-xs">
                  <Plus className="size-4" />
                  Create new project
                </div>
              </CommandItem>
              <CommandItem className="group">
                <div className="p-1 flex items-center gap-2 text-xs">
                  <List className="size-4" />
                  View all projects
                </div>
              </CommandItem>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectSelection;
