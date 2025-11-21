<template>
  <div class="page page-team-detail">
    <h1>チーム詳細（ID: {{ teamId }}）</h1>

    <section>
      <h2>メンバー一覧</h2>
      <table v-if="members.length">
        <thead>
          <tr>
            <th>名前</th>
            <th>メール</th>
            <th>ロール</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id">
            <td>{{ member.name }}</td>
            <td>{{ member.email }}</td>
            <td>
              <!-- TODO: セレクトボックスでロール変更 -->
              {{ member.role }}
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>メンバーがいません。</p>
    </section>

    <section>
      <h2>メンバー追加（TODO）</h2>
      <!-- 後でフォーム追加 -->
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const teamId = computed(() => route.params.id)

type Role = 'admin' | 'manager' | 'member' | 'viewer'

type Member = {
  id: number
  name: string
  email: string
  role: Role
}

const members = ref<Member[]>([
  // TODO: API から取得
  { id: 1, name: '山田 太郎', email: 'taro@example.com', role: 'admin' },
  { id: 2, name: '佐藤 花子', email: 'hanako@example.com', role: 'member' }
])
</script>
