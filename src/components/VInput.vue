<script lang="ts" setup>
defineProps<{
  modelValue: string
  label: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
<template>
  <label>{{ label }}</label>
  <input
    :value="modelValue"
    @input="onInput"
    class="border rounded outline-none text-black mb-4 py-1 px-3 transition focus:ring"
  />
</template>
