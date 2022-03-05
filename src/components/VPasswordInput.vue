<script lang="ts" setup>
import EyeSlashed from '~icons/akar-icons/eye-slashed'
import EyeOpen from '~icons/akar-icons/eye-open'
import { ref, watch } from 'vue'

const showPassword = ref(false)

const props = defineProps<{
  disabled?: boolean
  name?: string
  id?: string
  placeholder?: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(value: string): void {
  emit('update:modelValue', value)
}

watch(
  () => props.disabled,
  (val) => {
    if (val) showPassword.value = false
  }
)
</script>
<template>
  <div class="rounded mb-4 inline-flex items-stretch focus-within:ring">
    <VInput
      :modelValue="modelValue"
      @update:model-value="onInput"
      required
      class="rounded-r-none mb-0 text-slate-900 focus:ring-0"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="showPassword ? 'text' : 'password'"
    />
    <button
      type="button"
      :disabled="disabled"
      @click="showPassword = !showPassword"
      class="bg-white border rounded-r outline-none border-l-0 text-slate-500 focus:text-teal-500"
    >
      <eye-slashed v-if="showPassword" class="h-8 p-1 w-8" />
      <eye-open v-else class="h-8 p-1 w-8" />
    </button>
  </div>
</template>
