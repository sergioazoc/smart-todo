import { ref } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { fetchTaskInsights } from '@/services/task.service'
import type { Task } from '@/types/task'

const taskInsights = ref<string | null>(null)
const loading = ref(false)

const useTaskInsights = () => {
  const getTaskInsights = async (tasks: Task[]) => {
    try {
      loading.value = true
      taskInsights.value = null
      const response = await fetchTaskInsights(tasks)
      const markedHtml = await marked.parse(response)
      const sanitizedHtml = DOMPurify.sanitize(markedHtml)
      taskInsights.value = sanitizedHtml
    } catch (error) {
      console.error('Failed to prioritize tasks:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    getTaskInsights,
    taskInsights,
    loading,
  }
}

export default useTaskInsights
