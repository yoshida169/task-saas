<template>
  <div class="page page-me">
    <h1>プロフィール</h1>

    <form @submit.prevent="onSubmit">
      <div>
        <label for="name">名前</label>
        <input id="name" v-model="form.name" type="text" />
      </div>

      <div>
        <label for="email">メールアドレス</label>
        <input id="email" v-model="form.email" type="email" />
      </div>

      <div>
        <label for="avatar">アイコン画像（TODO）</label>
        <input id="avatar" type="file" />
      </div>

      <button type="submit">保存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
type ProfileForm = {
  name: string
  email: string
}

const form = ref<ProfileForm>({
  // TODO: API から現在のプロフィールを取得
  name: 'サンプルユーザー',
  email: 'user@example.com'
})

const onSubmit = () => {
  // TODO: API へ更新リクエスト
  console.log('update profile', form.value)
}
</script>
