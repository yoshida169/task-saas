<template>
  <div class="page page-projects">
    <h1>プロジェクト一覧</h1>

    <section>
      <h2>参加中のプロジェクト</h2>
      <p>ログイン中: {{ auth.user?.name }}</p>

      <ul v-if="projects.length">
        <li v-for="project in projects" :key="project.id">
          <button @click="goProject(project.id)">
            {{ project.name }}
          </button>
        </li>
      </ul>
      <p v-else>プロジェクトがありません。</p>
    </section>

    <section>
      <h2>自分の担当タスク（サマリ）</h2>
      <ul v-if="tasks && tasks.length">
        <li v-for="task in tasks" :key="task.id">
          <span>{{ task.title }} ({{ task.status }})</span>
          
          <button @click="updateStatus(task.id, 'doing')">→ Doing</button>
          <button @click="updateStatus(task.id, 'done')">→ Done</button>
          <button @click="updateStatus(task.id, 'todo')">→ ToDo</button>
        </li>
      </ul>
      <p v-else>担当タスクはありません。</p>
    </section>

    <button @click="createProject">
      新規プロジェクト作成
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useApi } from '~/composables/useApi'
import type { Task } from '~~/server/utils/taskStore'

const auth = useAuthStore()
const router = useRouter()
const { apiFetch  } = useApi()

type Project = {
  id: number
  name: string
}

const projects = ref<Project[]>([])
const tasks = ref<Task[]>([])

onMounted(async () => {
  try {
    projects.value = await apiFetch<Project[]>('/projects')
    tasks.value = await apiFetch<Task[]>('/tasks')
  } catch (e) {
    console.error('projects/tasks fetch failed:', e)
  }
})

const goProject = (id: number) => {
  router.push(`/projects/${id}`)
}

const updateStatus = async (taskId: number, status: 'todo' | 'doing' | 'done') => {
  const updated = await apiFetch<Task>(`/tasks/${taskId}`, {
    method: 'PATCH',
    body: { status },
  })

  tasks.value = tasks.value.map(t => (t.id === updated.id ? updated : t))
}

const createProject = () => {
  // TODO: モーダル or 別ページで作成
  console.log('create project')
}
</script>
