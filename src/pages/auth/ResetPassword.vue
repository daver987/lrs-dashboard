<script setup>
import { useAuthStore } from '@/stores/useAuth'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

/* Parse the route hash into a dictionary so we can pick out the access_token provided */
const hashDictionary = {}
// first remove the actual '#' character
const hash = route.hash.replace('#', '')
// split hash into key-value pairs
hash.split('&').forEach((item) => {
  // split 'key=value' into [key, value]
  const [key, value] = item.split('=')
  // add to results
  hashDictionary[key] = value
})
const resetToken = hashDictionary.access_token

const password = ref('')
const loading = ref(false)
async function onSubmit() {
  const { supabase } = useAuthStore()
  loading.value = true
  const { error, data } = await supabase.auth.api.updateUser(resetToken, {
    password: password.value,
  })
  console.log(error, data)

  if (error) {
    alert(error.message)
  } else {
    alert('successfully reset password.')
    await router.push('/')
  }
  loading.value = false
}
</script>
<template>
  <q-card-section>
    <h2 class="font-bold mb-2 text-2xl text-grey-9">Reset Password</h2>
    <p class="text-sm mb-4 text-grey-9">Choose a new password below</p>
  </q-card-section>
  <q-card-section>
    <q-form class="q-gutter-md" @submit.prevent="onSubmit">
      <q-input
        :disabled="loading"
        name="password"
        placeholder="Choose your password"
        v-model="password"
      />

      <q-btn
        :loading="loading"
        type="submit"
        no-caps
        color="primary"
        unelevated
      >
        Reset
      </q-btn>
    </q-form>
  </q-card-section>
</template>
