export type Status = 'todo' | 'doing' | 'done'

export type Task = {
  id: number
  projectId: number
  title: string
  description: string
  status: Status
  assignee: string
  dueDate: string
}

// NOTE: dev中の簡易ストア
let tasks: Task[] = [
  {
    id: 1,
    projectId: 1,
    title: '仕様書を書く',
    description: 'プロジェクトAの仕様書を作成する',
    status: 'todo',
    assignee: '山田 太郎',
    dueDate: '2025-11-30',
  },
  {
    id: 2,
    projectId: 1,
    title: 'API設計をする',
    description: '認証とタスク管理用APIを設計する',
    status: 'doing',
    assignee: '佐藤 花子',
    dueDate: '2025-12-05',
  },
  {
    id: 3,
    projectId: 2,
    title: 'デプロイ設定',
    description: '本番環境へのデプロイフローを整える',
    status: 'done',
    assignee: '鈴木 次郎',
    dueDate: '2025-12-10',
  },
]

export const listTasksByProject = (projectId: number) =>
  tasks.filter(t => t.projectId === projectId)

export const findTaskById = (taskId: number) =>
  tasks.find(t => t.id === taskId) ?? null

export const updateTaskStatus = (taskId: number, status: Status) => {
  const idx = tasks.findIndex(t => t.id === taskId)
  if (idx === -1) return null
  tasks[idx] = { ...tasks[idx], status }
  return tasks[idx]
}

export const createTask = (input: Omit<Task, 'id'>): Task => {
  const maxId = tasks.reduce((max, t) => Math.max(max, t.id), 0)
  const newTask: Task = { id: maxId + 1, ...input }
  tasks.push(newTask)
  return newTask
}
