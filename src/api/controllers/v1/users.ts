import type { Context } from 'koa'
import compose from 'koa-compose'
import type { Input as CreateUserInput } from '../../../operations/v1/users/create'
import { createUser, Output as createUserOutput } from '../../../operations/v1/users/create'
import { Input as getUserInput } from '../../../operations/v1/users/get'
import { getUser } from '../../../operations/v1/users/get'
import { Input as patchUserInput } from '../../../operations/v1/users/patch'
import { patchUser } from '../../../operations/v1/users/patch'
import { validate } from '../../middleware/controller-validations'
import { Input as deleteUserInput } from '../../../operations/v1/users/delete'
import { deleteUser } from '../../../operations/v1/users/delete'
import * as schema from '../../validations/schemas/v1/users'
import  { userWithTokens, serializedUser } from '../../serializers/user'
import { authenticated } from '../../middleware/authentication'
import { authorized } from '../../middleware/authorization'
import { User } from '../../../database/models/user'
import {NotFoundError} from '../../../utils/errors'

export const create = compose([
  validate( schema.create ),
  async (ctx: Context): Promise<void> => {
    const inputData: CreateUserInput = {
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
      dateOfBirth: ctx.request.body.dateOfBirth,
      readingPreferences: ctx.request.body.readingPreferences,
      ipAddress: ctx.request.ip,
    }
    
    const operationResult: createUserOutput = await createUser.execute(inputData)
    ctx.created(userWithTokens(operationResult.user, operationResult.accessToken, operationResult.refreshToken))
  },
])

export const me = compose([
  authenticated,
  async (ctx: Context): Promise<void> => {
    const inputData: getUserInput = {
      id: ctx.state.userId,
    }
    
    const existingUser: User | undefined = await getUser.execute(inputData)

    if(!existingUser){
      throw new NotFoundError()
    }
    
    ctx.ok(serializedUser(existingUser))
  },
])

export const patch = compose([
  validate( schema.patch ),
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: patchUserInput = {
      id: ctx.params.userId,
      ...ctx.request.body,
    }

    await patchUser.execute(inputData)

    ctx.ok()
  },
])

export const remove = compose([
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: getUserInput = {
      id: ctx.params.userId,
    }
    
    await deleteUser.execute(inputData)
    
    ctx.ok()
  },
])
