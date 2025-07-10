<script setup lang="ts">
import { Icon } from '@iconify/vue'
import useTask from '@/composables/useTask'
import BaseButton from '@/components/ui/BaseButton.vue'

const { tasks, removeTask, toggleTask } = useTask()
</script>

<template>
  <div v-if="tasks.length" class="task-list">
    <div class="task-list-item" v-for="task in tasks" :key="task.id">
      <div class="task-list-item-content">
        <div>
          <Icon
            class="task-list-item-content-icon"
            :color="task.completed ? 'green' : 'gray'"
            height="25"
            width="25"
            @click="toggleTask(task.id)"
            :icon="task.completed ? 'lucide:circle-check' : 'lucide:circle'"
          />
        </div>
        <span :class="[task.completed && 'task-completed']">
          {{ task.text }}
        </span>
      </div>
      <BaseButton variant="terciary" @click="removeTask(task.id)">
        <Icon icon="lucide:trash-2" height="20" width="20" color="red" />
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.task-list-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.task-list-item-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 800;
  font-size: 1.2rem;
  text-transform: capitalize;

  & svg {
    cursor: pointer;
  }
}

.task-completed {
  text-decoration: line-through;
  color: gray;
}
</style>
