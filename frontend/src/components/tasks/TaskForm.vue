<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import InputText from '@/components/ui/InputText.vue'
import useTask from '@/composables/useTask'
import { v4 as uuidv4 } from 'uuid'

const { addTask } = useTask()
const inputValue = ref('')

const handleSubmit = () => {
  const trimmedValue = inputValue.value.trim()
  if (trimmedValue) {
    const newTask = {
      id: uuidv4(),
      text: trimmedValue,
      completed: false,
    }
    addTask(newTask)
    inputValue.value = ''
  } else {
    console.warn('Cannot add an empty task')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <InputText type="text" v-model="inputValue" placeholder="Agrega una tarea por hacer..." />
    <BaseButton variant="primary">Agregar tarea</BaseButton>
  </form>
</template>

<style scoped>
.task-form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
}
@media (max-width: 600px) {
  .task-form {
    grid-template-columns: 1fr;
  }
}
</style>
