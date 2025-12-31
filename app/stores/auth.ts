import { defineStore } from 'pinia'

type User = { id: number; name: string; email: string }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    login(email: string, _password: string) {
      const token = useCookie<string | null>('token')
      token.value = 'dummy-token'

      const nextUser: User = { id: 1, name: 'デモユーザー', email }

      useCookie<User | null>('user').value = nextUser
      this.user = nextUser
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
