import { defineStore } from 'pinia'

type User = { id: number; name: string; email: string }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    async login(email: string, password: string) {
      const config = useRuntimeConfig()
      const data = await $fetch<{ token: string; user: User }>(`${config.public.apiBase}/login`, {
        method: 'POST',
        body: { email, password },
      })

      useCookie<string | null>('token').value = data.token
      useCookie<User | null>('user').value = data.user
      this.user = data.user
    },

    hydrateFromCookie() {
      const user = useCookie<User | null>('user')
      this.user = user.value ?? null
    },

    logout() {
      useCookie<string | null>('token').value = null
      useCookie<User | null>('user').value = null
      this.user = null
    },
  },
})
