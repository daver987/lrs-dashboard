import { supabase } from '@/services/supabase'

async function addAccount(account) {
  const { data, error } = await supabase.from('accounts').insert([account])
  return { data, error }
}

export { addAccount }
