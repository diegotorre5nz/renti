import type { Context } from 'koa'
import compose from 'koa-compose'
import { createThread, Output as createThreadOutput } from '../../../operations/v1/threads/create'
import { getAllMains as getAllMainThreads, Input as getAllMainsThreadInput } from '../../../operations/v1/threads/get-all-mains'
import { getThreadAll as getThreadAllOperation, Input as getThreadAllInput } from '../../../operations/v1/threads/get-thread-all'
import { deleteThread, Input as deleteThreadInput } from '../../../operations/v1/threads/delete'
import { validate } from '../../middleware/controller-validations'
import { Input as createThreadInput } from '../../../operations/v1/threads/create'
import * as schema from '../../validations/schemas/v1/threads'
import  { serializedThreadWithUserAndPrevious, serializedThreadArray } from '../../serializers/thread'
import { authenticated } from '../../middleware/authentication'
import { authorized } from '../../middleware/authorization'
import { Thread } from '../../../database/models/thread'
import {NotFoundError} from '../../../utils/errors'

export const create = compose([
  authenticated,
  authorized,
  validate( schema.create ),
  async (ctx: Context): Promise<void> => {
    const inputData: createThreadInput = {
      text: ctx.request.body.text,
      clubId: ctx.params.clubId,
      userId: ctx.state.userId,
      mainThreadId: ctx.request.body.mainThreadId,
      previousThreadId: ctx.request.body.previousThreadId,
    }
    const operationResult: createThreadOutput = await createThread.execute(inputData)
    ctx.created(serializedThreadWithUserAndPrevious(operationResult.thread))
  },
])

export const getAllMains = compose([
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: getAllMainsThreadInput = {
      clubId: ctx.params.clubId,
      userId: ctx.params.userId
    }
    
    const threads: Thread[] | undefined = await getAllMainThreads.execute(inputData)

    if(!threads){
      throw new NotFoundError()
    }

    ctx.ok(serializedThreadArray(threads))
  },
])

export const getThreadAll = compose([
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: getThreadAllInput = {
      mainThreadId: ctx.params.threadId,
      clubId: ctx.params.clubId,
      userId: ctx.params.userId
    }
    const allThreadsFromMain: Thread[] | undefined = await getThreadAllOperation.execute(inputData)

    if(!allThreadsFromMain){
      throw new NotFoundError()
    }
    
    ctx.ok(serializedThreadArray(allThreadsFromMain))
  },
])

export const remove = compose([
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: deleteThreadInput = {
      id: ctx.params.threadId,
      userId: ctx.params.userId
    }
    
    await deleteThread.execute(inputData)

    ctx.ok()
  },
])
