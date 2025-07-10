import API from '@/api'
import type { Task } from '@/types/task'

export const fetchTaskInsights = async (tasks: Task[]) => {
  try {
    const response = await API.post('/api/tasks/insights', tasks)
    return response.data.result
  } catch (error) {
    throw new Error(`Failed to prioritize tasks: ${error}`)
  }
}
