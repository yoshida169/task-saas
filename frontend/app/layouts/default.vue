<template>
  <div>
    <header style="padding: 12px; border-bottom: 1px solid #ddd; display: flex; gap: 12px; align-items: center; justify-content: space-between;">
      <h1 style="margin: 0;">Task SaaS</h1>

      <div style="display: flex; gap: 8px; align-items: center;">
        <span v-if="auth.user">ログイン中: {{ auth.user.name }}</span>

        <button
          v-if="auth.user"
          type="button"
          @click="onLogout"
          style="padding: 6px 10px; border: 1px solid #999; border-radius: 6px; background: white; cursor: pointer;"
        >
          ログアウト
        </button>

        <NuxtLink
          v-if="!auth.user && route.path !== '/login'"
          to="/login"
          style="text-decoration: underline;"
        >
          ログイン
        </NuxtLink>
      </div>
    </header>

    <main style="padding: 16px;">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const onLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>
