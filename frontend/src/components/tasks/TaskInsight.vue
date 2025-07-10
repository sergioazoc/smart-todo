<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import useTask from '@/composables/useTask'
import useTaskInsights from '@/composables/useTaskInsights'

const { tasks } = useTask()
const { getTaskInsights, taskInsights, loading } = useTaskInsights()
</script>

<template>
  <div class="task-insights">
    <BaseButton
      :class="[loading && 'ai-loading']"
      variant="secondary"
      @click="getTaskInsights(tasks)"
      :disabled="!tasks.length"
    >
      <Icon icon="lucide:stars" />
      {{ loading ? 'Organizando...' : 'Organizar con IA' }}
    </BaseButton>
    <small v-if="!tasks.length">Agrega tareas para poder organizarlas con IA</small>
    <div v-if="taskInsights && tasks.length" class="task-insights-content">
      <div v-html="taskInsights" class="prose"></div>
    </div>
  </div>
</template>

<style scoped>
.task-insights {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.task-insights-content {
  width: 100%;
  margin-top: 2rem;
  background-color: rgb(251, 251, 251);
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  & h2 {
    margin-bottom: 2rem;
    font-size: 1.6rem;
    text-align: center;
  }
}

.ai-loading {
  background: linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4, #10b981) !important;
  background-size: 300% 300% !important;
  animation: ai-gradient 2s ease infinite;
  position: relative;
  overflow: hidden;
  pointer-events: none;
  cursor: not-allowed;
}

.ai-loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: ai-shimmer 1.5s infinite;
}

.ai-icon-loading {
  animation: ai-sparkle 1s ease-in-out infinite;
  filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.6));
}

@keyframes ai-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes ai-shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes ai-sparkle {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.6));
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.8));
  }
}
</style>
