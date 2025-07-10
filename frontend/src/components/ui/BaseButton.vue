<script setup lang="ts">
defineProps<{
  variant: 'primary' | 'secondary' | 'terciary'
  disabled?: boolean
}>()
</script>

<template>
  <button :class="[`btn-${variant}`]" class="btn" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: rgb(251, 62, 19);
  color: white;
}
.btn-primary:hover {
  background-color: rgb(220, 50, 15);
}
.btn-primary:active {
  background-color: rgb(200, 40, 10);
}

.btn-secondary {
  background-image: linear-gradient(to right, #667eea, #764ba2);
}
.btn-secondary {
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
}

.btn-secondary:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.btn-terciary {
  background-color: transparent;
  color: #333;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
