import { projectService } from '@/services/project.service'
import { useQuery } from '@tanstack/react-query'

export function useProjects() {
  const {
		data: projects = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ['getProjects'],
		queryFn: () => projectService.getUserProjects(),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		retry: 0,
	})

  return { projects, isLoading, error }
}