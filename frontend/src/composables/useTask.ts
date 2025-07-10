import { ref, watch } from 'vue'
import useTaskInsights from '@/composables/useTaskInsights'
import type { Task } from '@/types/task'

const { taskInsights } = useTaskInsights()

const STORAGE_KEY = 'tasks'
const stored = localStorage.getItem(STORAGE_KEY)
const tasks = ref<Task[]>(stored ? JSON.parse(stored) : [])

const useTask = () => {
  const addTask = (task: Task) => {
    const exists = tasks.value.some((existingTask) => existingTask.id === task.id)
    if (!exists) {
      tasks.value.push(task)
    } else {
      console.warn(`Task with id ${task.id} already exists.`)
    }
  }

  const removeTask = (id: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  const toggleTask = (id: string) => {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.completed = !task.completed
    } else {
      console.warn(`Task with id ${id} not found.`)
    }
  }

  return {
    tasks,
    addTask,
    removeTask,
    toggleTask,
  }
}

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
    if (newTasks.length === 0) {
      taskInsights.value = null
    }
  },
  { deep: true },
)

export default useTask
