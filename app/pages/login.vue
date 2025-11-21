<template>
  <div class="page page-login">
    <h1>ログイン</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">メールアドレス</label>
        <input id="email" v-model="email" type="email" />
      </div>
      <div>
        <label for="password">パスワード</label>
        <input id="password" v-model="password" type="password" />
      </div>
      <button type="submit">
        ログイン
      </button>
    </form>
    <p>
      アカウントをお持ちでないですか？
      <NuxtLink to="/signup">サインアップ</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const email = ref('')
const password = ref('')

const onSubmit = () => {
  // TODO: API 呼び出しで実際にログイン処理を行う
  console.log('login', { email: email.value, password: password.value })
  router.push('/projects')
}
</script>
