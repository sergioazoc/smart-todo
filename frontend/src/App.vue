<script setup lang="ts">
import { Icon } from '@iconify/vue'
import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskList from '@/components/tasks/TaskList.vue'
import TaskInsight from '@/components/tasks/TaskInsight.vue'
</script>

<template>
  <header>
    <h1><Icon icon="lucide:brain-cog" color="#fb3f15" /> Smart Todo</h1>
    <p>Organiza tus tareas de forma inteligente</p>
  </header>
  <main class="container">
    <TaskForm />
    <TaskList />
    <TaskInsight />
  </main>
</template>

<style scoped>
header {
  padding: 60px 5px;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #2b2a3b 0%, #0c4535 100%);
  display: grid;
  gap: 1rem;

  & h1 {
    font-size: 3rem;
    color: white;
    display: flex;
    gap: 1rem;
    align-items: center;
    margin: 0 auto;
  }
  & p {
    font-size: 1.2rem;
    color: #e2e8f0;
  }
}
main {
  padding: 1rem 1rem 5rem 1rem;
}
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}
</style>
