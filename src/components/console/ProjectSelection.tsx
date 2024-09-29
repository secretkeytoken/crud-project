'use client';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ChevronsUpDown, Copy, List, Plus } from 'lucide-react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import useProjects from '@/hooks/useProjects';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useDashboardContext } from '../providers/ConsoleProvider';
import { useCopyToClipboard } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
const ProjectSelection: React.FC<Props> = ({ className }) => {
  const { selectedProject, setSelectedProject } = useDashboardContext();
  const [, copyToClipboard] = useCopyToClipboard();
  const [open, setOpen] = React.useState(false);
  const { data: projects } = useProjects();
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          aria-expanded={open}
          className={cn(
            'w-[256px] justify-between flex items-center h-16 hover:bg-lightGreen cursor-pointer p-3 border-b border-lightGreen select-none',
            className
          )}
        >
          <div className="flex items-center gap-2">
            {selectedProject ? (
              <>
                <Avatar className="size-7 rounded-sm">
                  <AvatarFallback className="uppercase font-bold text-xs rounded-sm">
                    {selectedProject?.project?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <h3 className="font-semibold text-white/80">
                    {selectedProject?.project}
                  </h3>
                  <span
                    className="text-white/50 cursor-pointer hover:text-white/80 flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(selectedProject.id);
                      toast.success('Project ID copied to clipboard');
                    }}
                  >
                    <Copy className="size-3" />
                    {selectedProject.id}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Avatar className="size-7 rounded-sm">
                  <AvatarFallback className="uppercase font-bold text-xs rounded-sm">
                    PJ
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <h3 className="font-semibold">Select a project</h3>
                  <span className="text-muted-foreground">---</span>
                </div>
              </>
            )}
          </div>
          <ChevronsUpDown className="ml-2 size-5 shrink-0 opacity-50 text-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[256px] p-1">
        <Command>
          <CommandGroup heading="Projects">
            <CommandList>
              {projects?.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setSelectedProject(item);
                    setOpen((prev) => !prev);
                  }}
                  className="group cursor-pointer"
                >
                  <div className="p-1 flex items-center gap-2 w-full">
                    <Avatar className="size-7 rounded-sm">
                      <AvatarFallback className="uppercase group-hover:bg-darkGreen font-bold text-xs rounded-sm">
                        {item.project.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{item?.project}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandList>
              <CommandItem className="group">
                <div
                  className="p-1 flex items-center gap-2 text-xs cursor-pointer"
                  onClick={() => router.replace('/console/register')}
                >
                  <Plus className="size-4" />
                  Create new project
                </div>
              </CommandItem>
              <CommandItem className="group">
                <div
                  className="p-1 flex items-center gap-2 text-xs cursor-pointer"
                  onClick={() => router.replace('/console/list')}
                >
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
