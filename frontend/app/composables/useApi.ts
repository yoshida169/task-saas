import { useAuthStore } from "~/stores/auth"

export const useApi = () => {
  const token = useCookie<string | null>('token')

  const apiFetch = $fetch.create({
    baseURL: '/api',
    onRequest({ options }) {
      if (token.value) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token.value}`)
        options.headers = headers
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
      }
    },
  })

  return { apiFetch }
}
