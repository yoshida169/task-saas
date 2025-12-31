<template>
  <div class="page page-project-detail">
    <h1>プロジェクト詳細（ID: {{ projectId }}）</h1>

    <section class="kanban">
      <div class="kanban-column">
        <h2>ToDo</h2>
        <ul>
          <li v-for="task in todoTasks" :key="task.id">
            <button @click="goTask(task.id)">
              {{ task.title }}
            </button>
          </li>
        </ul>
      </div>

      <div class="kanban-column">
        <h2>Doing</h2>
        <ul>
          <li v-for="task in doingTasks" :key="task.id">
            <button @click="goTask(task.id)">
              {{ task.title }}
            </button>
          </li>
        </ul>
      </div>

      <div class="kanban-column">
        <h2>Done</h2>
        <ul>
          <li v-for="task in doneTasks" :key="task.id">
            <button @click="goTask(task.id)">
              {{ task.title }}
            </button>
          </li>
        </ul>
      </div>
    </section>

    <button @click="createTask">
      新規タスク作成（TODO）
    </button>
  </div>
</template>

<script setup lang="ts">
const { apiFetch } = useApi()
const route = useRoute()
const router = useRouter()

const projectId = computed(() => Number(route.params.id))

type Status = 'todo' | 'doing' | 'done'

type Task = {
  id: number
  projectId: number
  title: string
  status: Status
}

const { data: tasks } = await useAsyncData<Task[]>(
  `project-${projectId.value}-tasks`,
  () => apiFetch<Task[]>(`/projects/${projectId.value}/tasks`),
  { default: () => [] }
)

const todoTasks = computed(() => (tasks.value || []).filter(t => t.status === 'todo'))
const doingTasks = computed(() => (tasks.value || []).filter(t => t.status === 'doing'))
const doneTasks = computed(() => (tasks.value || []).filter(t => t.status === 'done'))

const goTask = (id: number) => router.push(`/tasks/${id}`)

</script>
