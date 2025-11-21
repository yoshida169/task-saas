<template>
  <div class="page page-signup">
    <h1>サインアップ</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="name">ユーザー名</label>
        <input id="name" v-model="name" type="text" />
      </div>
      <div>
        <label for="email">メールアドレス</label>
        <input id="email" v-model="email" type="email" />
      </div>
      <div>
        <label for="password">パスワード</label>
        <input id="password" v-model="password" type="password" />
      </div>
      <button type="submit">
        アカウント作成
      </button>
    </form>
    <p>
      すでにアカウントをお持ちですか？
      <NuxtLink to="/login">ログイン</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const onSubmit = () => {
  // TODO: API 呼び出しでサインアップ処理
  console.log('signup', {
    name: name.value,
    email: email.value,
    password: password.value
  })
  router.push('/projects')
}
</script>
