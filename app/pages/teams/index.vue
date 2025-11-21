<template>
  <div class="page page-teams">
    <h1>チーム選択</h1>

    <ul v-if="teams.length">
      <li v-for="team in teams" :key="team.id">
        <button @click="goTeam(team.id)">
          {{ team.name }}
        </button>
      </li>
    </ul>
    <p v-else>所属しているチームがありません。</p>

    <button @click="createTeam">
      新しいチームを作成（TODO）
    </button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

type Team = {
  id: number
  name: string
}

const teams = ref<Team[]>([
  // TODO: API から取得する
  { id: 1, name: 'サンプルチーム A' },
  { id: 2, name: 'サンプルチーム B' }
])

const goTeam = (id: number) => {
  router.push(`/teams/${id}`)
}

const createTeam = () => {
  // TODO: チーム作成モーダルなど
  console.log('create team')
}
</script>
