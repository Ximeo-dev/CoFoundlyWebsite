import { projectService } from '@/services/project.service'
import { useQuery } from '@tanstack/react-query'

export function useProjectById(projectId: string) {
  const {
		data: project,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['getProjectById', projectId],
		queryFn: () => projectService.getProjectById(projectId),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		retry: 1,
		enabled: !!projectId,
	})

  return { project, isLoading, error }
}