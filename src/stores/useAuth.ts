import { supabase } from '@/services/supabase'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return { supabase }
  },
})
