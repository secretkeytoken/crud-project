import { ProjectItemType } from "@/types/Project.type";
import { useQuery } from "@tanstack/react-query";

const useProjects = () => {
    return useQuery<ProjectItemType[]>({
        queryKey: ['projects'],
        queryFn: async () => {
            // const response = await fetch('/api/projects');
            // return response.json();
            return [
                {
                  id: 'aaa-aaa-aaa',
                  img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
                  name: 'John Michael',
                  email: 'john@creative-tim.com',
                  project: 'Project 1',
                  org: 'Organization',
                  online: true,
                  date: '23/04/18',
                },
                {
                  id: 'bbb-bbb-bbb',
                  img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
                  name: 'Alexa Liras',
                  email: 'alexa@creative-tim.com',
                  project: 'Project 2',
                  org: 'Developer',
                  online: false,
                  date: '23/04/18',
                },
                {
                  id: 'ccc-ccc-ccc',
                  img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
                  name: 'Laurent Perrier',
                  email: 'laurent@creative-tim.com',
                  project: 'Project 3',
                  org: 'Projects',
                  online: false,
                  date: '19/09/17',
                },
                {
                  id: 'ddd-ddd-ddd',
                  img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
                  name: 'Michael Levi',
                  email: 'michael@creative-tim.com',
                  project: 'Project 4',
                  org: 'Developer',
                  online: true,
                  date: '24/12/08',
                },
                {
                  id: 'eee-eee-eee',
                  img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
                  name: 'Richard Gran',
                  email: 'richard@creative-tim.com',
                  project: 'Project 5',
                  org: 'Executive',
                  online: false,
                  date: '04/10/21',
                },
              ]
        }
    })
}

export default useProjects;