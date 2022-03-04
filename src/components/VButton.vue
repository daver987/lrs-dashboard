<script lang="ts" setup>
import LoadingIcon from '~icons/ant-design/loading-outlined'
defineProps<{
  loading?: boolean
}>()
</script>
<template>
  <button class="rounded bg-blue-500 text-sm text-black mb-4 w-full py-2">
    <slot v-if="!loading" />
    <LoadingIcon v-else class="mx-auto h-5 animate-spin" data-cy="loading" />
  </button>
</template>
