import { supabase } from '@/services/supabase'
import { ref } from 'vue'

const user = ref({})
const loading = ref(true)
const accNum = ref(null)

const getAccountNumber = async () => {
  try {
    loading.value = true
    user.value = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`account_number`)
      .eq('user_id', user.value.id)

    if (error && status !== 406) {
      console.log(error)
      return
    }

    if (data) {
      accNum.value = data
      console.log(accNum.value)
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
  return accNum.value
}

export { getAccountNumber }
