import type { Context } from 'koa'
import compose from 'koa-compose'
import { createClub, Output as createClubOutput } from '../../../operations/v1/clubs/create'
import { Input as getClubInput } from '../../../operations/v1/clubs/get'
import { Input as getAllClubInput } from '../../../operations/v1/clubs/get-all'
import { getClub } from '../../../operations/v1/clubs/get'
import { getAll as getAllClubs } from '../../../operations/v1/clubs/get-all'
import { Input as patchClubInput } from '../../../operations/v1/clubs/patch'
import { patchClub } from '../../../operations/v1/clubs/patch'
import { validate } from '../../middleware/controller-validations'
import { Input as createClubInput } from '../../../operations/v1/clubs/create'
import { deleteClub } from '../../../operations/v1/clubs/delete'
import * as schema from '../../validations/schemas/v1/club'
import  { clubWithCreator, clubWithCreatorArray, serializedClub } from '../../serializers/club'
import { authenticated } from '../../middleware/authentication'
import { authorized } from '../../middleware/authorization'
import { Club } from '../../../database/models/club'
import {NotFoundError} from '../../../utils/errors'

export const create = compose([
  authenticated,
  authorized,
  validate( schema.create ),
  async (ctx: Context): Promise<void> => {
    const inputData: createClubInput = {
      name: ctx.request.body.name,
      userId: ctx.state.userId,
    }
    console.log(inputData)
    const operationResult: createClubOutput = await createClub.execute(inputData)
    ctx.created(clubWithCreator(operationResult.club))
  },
])

export const get = compose([
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: getClubInput = {
      id: ctx.params.id,
      userId: ctx.params.userId
    }
    
    const existingClub: Club | undefined = await getClub.execute(inputData)

    if(!existingClub){
      throw new NotFoundError()
    }
    
    ctx.ok(clubWithCreator(existingClub))
  },
])

export const getAll = compose([
  authenticated,
  async (ctx: Context): Promise<void> => {
    const inputData: getAllClubInput = {
      id: ctx.params.id,
    }
    
    const existingClubs: Club[] | undefined = await getAllClubs.execute(inputData)

    if(!existingClubs){
      throw new NotFoundError()
    }
    console.log(existingClubs)
    ctx.ok(clubWithCreatorArray(existingClubs))
  },
])

export const patch = compose([
  validate( schema.patch ),
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: patchClubInput = {
      id: ctx.params.id,
      userId: ctx.params.userId,
      ...ctx.request.body,
    }

    const updatedClub: Club | undefined = await patchClub.execute(inputData)

    if(!updatedClub){
      throw new NotFoundError()
    }

    ctx.ok(serializedClub(updatedClub))
  },
])

export const remove = compose([
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: getClubInput = {
      id: ctx.params.id,
      userId: ctx.params.userId,
    }
    
    const deletedClub: Club | undefined = await deleteClub.execute(inputData)

    if(!deletedClub){
      throw new NotFoundError()
    }
    
    ctx.ok(serializedClub(deletedClub))
  },
])
