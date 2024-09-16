import { ProjectItemType } from "@/types/Project.type";
import { useQuery } from "@tanstack/react-query";

const useProjects = () => {
    return useQuery<ProjectItemType[]>({
        queryKey: ['projects'],
        queryFn: async () => {
            // const response = await fetch('/api/projects');
            // return response.json();
            return [{
                id: 'aaaa-aaa-aaaa',
                name: 'Project 1',
            }, {
                id: 'bbbb-bbb-bbbb',
                name: 'Project 2'
            }]
        }
    })
}

export default useProjects;