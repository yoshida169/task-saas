import { findTaskById } from "~~/server/utils/taskStore"

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const taskId  = Number(getRouterParam(event, 'taskId'))
  if (!Number.isFinite(taskId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid task id' })
  }

  const task = findTaskById(taskId)
  
  if (!task) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }

  return task
})