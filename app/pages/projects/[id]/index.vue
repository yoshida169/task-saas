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
const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.id)

type Status = 'todo' | 'doing' | 'done'

type Task = {
  id: number
  title: string
  status: Status
}

const tasks = ref<Task[]>([
  // TODO: API から取得
  { id: 1, title: '仕様書を書く', status: 'todo' },
  { id: 2, title: 'API設計', status: 'doing' },
  { id: 3, title: 'デプロイ設定', status: 'done' }
])

const todoTasks = computed(() => tasks.value.filter(t => t.status === 'todo'))
const doingTasks = computed(() => tasks.value.filter(t => t.status === 'doing'))
const doneTasks = computed(() => tasks.value.filter(t => t.status === 'done'))

const goTask = (id: number) => {
  router.push(`/tasks/${id}`)
}

const createTask = () => {
  // TODO: モーダルなどでタスク作成
  console.log('create task')
}
</script>
