<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/useAuth'
const { supabase } = useAuthStore()

const reRoute = computed(() => {
  if (supabase.auth.user())
    return {
      to: '/',
      text: 'Go Home',
    }
  return {
    to: '/signin',
    text: 'Sign In',
  }
})
</script>
<template>
  <div class="font-medium text-xl mb-4 self-center">404 - Page not found</div>
  <router-link :to="reRoute.to" class="self-center">{{
    reRoute.text
  }}</router-link>
</template>
