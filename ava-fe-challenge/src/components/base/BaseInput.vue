<template>
  <div>
    <label :for="label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <input
      :type="type"
      :name="label"
      :id="label"
      @input="$emit('update:modelValue', $event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; type: string; placeholder: string }>();
</script>

<style scoped></style>
