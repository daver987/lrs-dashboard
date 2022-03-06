<script setup>
import { useAuthStore } from '@/stores/useAuth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  signUp: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  emailPlaceholder: {
    type: String,
  },
  passwordPlaceholder: {
    type: String,
  },
})

const credentials = ref({
  email: '',
  password: '',
})

const router = useRouter()

const emailLoading = ref(false)
async function emailAuth() {
  emailLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = props.signUp
    ? await supabase.auth.signUp(credentials.value)
    : await supabase.auth.signIn(credentials.value)
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    emailLoading.value = false
  }
}

const appleLoading = ref(false)
async function appleAuth() {
  appleLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = await supabase.auth.signIn(
    { provider: 'github' },
    {
      redirectTo: `${window.location.origin}/callback`,
    }
  )
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    appleLoading.value = false
  }
}

const googleLoading = ref(false)
async function googleAuth() {
  googleLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = await supabase.auth.signIn(
    { provider: 'google' },
    {
      redirectTo: `${window.location.origin}/callback`,
    }
  )
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    googleLoading.value = false
  }
}

const twitterLoading = ref(false)
async function twitterAuth() {
  twitterLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = await supabase.auth.signIn(
    { provider: 'twitter' },
    {
      redirectTo: `${window.location.origin}/callback`,
    }
  )
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    twitterLoading.value = false
  }
}

const facebookLoading = ref(false)
async function facebookAuth() {
  facebookLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = await supabase.auth.signIn(
    { provider: 'facebook' },
    {
      redirectTo: `${window.location.origin}/callback`,
    }
  )
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    facebookLoading.value = false
  }
}

const loading = computed(
  () =>
    appleLoading.value ||
    emailLoading.value ||
    googleLoading.value ||
    twitterLoading.value ||
    facebookLoading.value
)
</script>
<template>
  <q-card-section>
    <h2 class="font-bold text-center mb-2 text-2xl text-grey-9">
      {{ title }}
    </h2>
    <p class="text-center text-sm mb-4 text-grey-9">
      {{ subtitle }}
    </p>
  </q-card-section>
  <q-card-section>
    <q-form class="q-gutter-md" @submit.prevent="emailAuth">
      <q-input
        label="Email"
        name="email"
        outlined
        dense
        required
        :disabled="loading"
        type="email"
        :placeholder="emailPlaceholder"
        v-model="credentials.email"
      />

      <q-input
        outlined
        dense
        label="Password"
        :disabled="loading"
        name="password"
        type="password"
        :placeholder="passwordPlaceholder"
        v-model="credentials.password"
      />
      <div class="space-y-2 col">
        <q-btn
          v-if="!signUp"
          to="/forgotpassword"
          label="Forgot your password"
          flat
          no-caps
          class="row"
        />
        <q-btn
          no-caps
          :loading="emailLoading"
          :disabled="loading"
          type="submit"
          class="row full-width"
          color="primary"
          unelevated
          >{{ signUp ? 'Sign Up' : 'Sign In' }}</q-btn
        >
      </div>
    </q-form>
  </q-card-section>

  <q-card-section class="row justify-evenly">
    <q-btn
      :loading="appleLoading"
      :disabled="loading"
      type="button"
      @click="appleAuth"
      round
      flat
    >
      <i-mdi-apple class="h-8 w-8 color-[#121212]" />
    </q-btn>
    <q-btn
      :loading="googleLoading"
      :disabled="loading"
      type="button"
      @click="googleAuth"
      round
      flat
    >
      <i-mdi-google class="h-8 w-8 text-[#D73F2A]" />
    </q-btn>
    <q-btn
      :loading="twitterLoading"
      :disabled="loading"
      type="button"
      @click="twitterAuth"
      round
      flat
    >
      <i-mdi-twitter class="h-8 w-8 text-[#1DA1F2]" />
    </q-btn>
    <q-btn
      :loading="facebookLoading"
      :disabled="loading"
      type="button"
      @click="facebookAuth"
      round
      flat
    >
      <i-mdi-facebook class="h-8 w-8 text-[#3B5998]" />
    </q-btn>
  </q-card-section>
  <q-card-section>
    <slot name="actions" />
  </q-card-section>
</template>
