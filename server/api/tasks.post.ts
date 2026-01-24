import { createTask, type Status } from '~~/server/utils/taskStore'

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody<{
    projectId?: unknown
    title?: unknown
    description?: unknown
    assignee?: unknown
    dueDate?: unknown
    status?: unknown
  }>(event)

  if (typeof body?.projectId !== 'number' || !Number.isFinite(body.projectId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid projectId' })
  }
  if (typeof body?.title !== 'string' || body.title.trim() === '') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid title' })
  }
  if (typeof body?.description !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid description' })
  }
  if (typeof body?.assignee !== 'string' || body.assignee.trim() === '') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid assignee' })
  }
  if (typeof body?.dueDate !== 'string' || body.dueDate.trim() === '') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid dueDate' })
  }

  const allowed: Status[] = ['todo', 'doing', 'done']
  const status: Status = body?.status === undefined ? 'todo' : (body.status as Status)
  if (typeof body?.status !== 'undefined' && (typeof body.status !== 'string' || !allowed.includes(body.status as Status))) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid status' })
  }

  const newTask = createTask({
    projectId: body.projectId,
    title: body.title,
    description: body.description,
    assignee: body.assignee,
    dueDate: body.dueDate,
    status,
  })

  setResponseStatus(event, 201)
  return newTask
})
