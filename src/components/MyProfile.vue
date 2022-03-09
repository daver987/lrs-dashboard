<template>
  <q-card class="max-w-xl q-pa-md">
    <q-form @submit.prevent="useUser.updateProfile">
      <Avatar
        v-model:path="useUser.userAvatarUrl"
        @upload="useUser.updateProfile"
      />

      <q-input
        id="email"
        type="text"
        v-model="user.email"
        disable
        label="Email"
        dense
        flat
      />

      <q-input
        id="username"
        type="text"
        v-model="userUserName"
        label="Username"
        dense
        flat
      />

      <q-input
        name="website"
        type="text"
        v-model="userCompanyWebsite"
        label="Website"
        dense
        flat
      />

      <q-btn
        type="submit"
        :disabled="loading"
        :label="loading ? 'Loading ...' : 'Update'"
      />
    </q-form>
  </q-card>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const useUser = useUserStore()
const { user, loading, userCompanyWebsite, userUserName } = storeToRefs(useUser)

onMounted(() => {
  useUser.getProfile()
})
</script>
<style scoped>
html,
body {
  --custom-font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  --custom-bg-color: #101010;
  --custom-panel-color: #222;
  --custom-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.8);
  --custom-color: #fff;
  --custom-color-brand: #24b47e;
  --custom-color-secondary: #666;
  --custom-border: 1px solid #333;
  --custom-border-radius: 5px;
  --custom-spacing: 5px;

  padding: 0;
  margin: 0;
  font-family: var(--custom-font-family);
  background-color: var(--custom-bg-color);
}

* {
  color: var(--custom-color);
  font-family: var(--custom-font-family);
  box-sizing: border-box;
}

.row [class^='col'] {
  float: left;
  margin: 0.5rem 2%;
  min-height: 0.125rem;
}

/* Forms */

label {
  display: block;
  margin: 5px 0;
  color: var(--custom-color-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
}

input {
  width: 100%;
  border-radius: 5px;
  border: var(--custom-border);
  padding: 8px;
  font-size: 0.9rem;
  background-color: var(--custom-bg-color);
  color: var(--custom-color);
}

input[disabled] {
  color: var(--custom-color-secondary);
}

.footer div {
  padding: var(--custom-spacing);
  display: flex;
  align-items: center;
  width: 100%;
}
.footer div > img {
  height: 20px;
  margin-left: 10px;
}
.footer > div:first-child {
  display: none;
}
.footer > div:nth-child(2) {
  justify-content: left;
}

@media only screen and (min-width: 60em) {
  /* 960px */
  .footer > div:first-child {
    display: flex;
  }
  .footer > div:nth-child(2) {
    justify-content: center;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
