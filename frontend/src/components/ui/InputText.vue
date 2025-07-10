<script setup lang="ts">
defineProps<{
  placeholder: string
}>()

const model = defineModel()
</script>

<template>
  <input type="text" v-model="model" :placeholder="placeholder" />
</template>

<style scoped>
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
}

input:focus {
  border-color: rgb(79, 57, 246);
  outline: none;
}
</style>
