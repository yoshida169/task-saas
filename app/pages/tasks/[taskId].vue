<template>
  <div class="page page-task-detail">
    <h1>タスク詳細（ID: {{ taskId }}）</h1>

    <section>
      <h2>情報</h2>
      <p>タイトル: {{ task.title }}</p>
      <p>説明: {{ task.description }}</p>
      <p>ステータス: {{ task.status }}</p>
      <p>担当者: {{ task.assignee }}</p>
      <p>期限: {{ task.dueDate }}</p>
    </section>

    <section>
      <h2>コメント</h2>
      <ul v-if="comments.length">
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.author }}</strong>:
          {{ comment.body }}
        </li>
      </ul>
      <p v-else>コメントはまだありません。</p>

      <form @submit.prevent="addComment">
        <textarea v-model="newComment" rows="3" />
        <button type="submit">コメントを追加</button>
      </form>
    </section>

    <section>
      <h2>添付ファイル（TODO）</h2>
      <!-- TODO: 添付ファイル表示 & アップロード -->
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const taskId = computed(() => route.params.taskId)

type TaskDetail = {
  title: string
  description: string
  status: string
  assignee: string
  dueDate: string
}

type Comment = {
  id: number
  author: string
  body: string
}

const task = ref<TaskDetail>({
  // TODO: API から取得
  title: 'サンプルタスク',
  description: 'ここにタスクの詳細説明が入ります。',
  status: 'ToDo',
  assignee: '山田 太郎',
  dueDate: '2025-11-30'
})

const comments = ref<Comment[]>([
  // TODO: API から取得
  { id: 1, author: '佐藤', body: '確認しました！' }
])

const newComment = ref('')

const addComment = () => {
  if (!newComment.value.trim()) return

  comments.value.push({
    id: Date.now(),
    author: '自分（仮）',
    body: newComment.value
  })

  newComment.value = ''
}
</script>
