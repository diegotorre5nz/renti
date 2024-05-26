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
import { Input as joinClubInput } from '../../../operations/v1/clubs/join'
import { joinClub } from '../../../operations/v1/clubs/join'
import { Input as unjoinClubInput } from '../../../operations/v1/clubs/unjoin'
import { unjoinClub } from '../../../operations/v1/clubs/unjoin'
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

    await patchClub.execute(inputData)

    ctx.ok()
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
    
    await deleteClub.execute(inputData)

    ctx.ok()
  },
])

export const join = compose([
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: joinClubInput = {
      clubId: ctx.params.clubId,
      userId: ctx.params.userId,
    }
    console.log(inputData)
    await joinClub.execute(inputData)

    ctx.ok()
  },
])

export const unjoin = compose([
  authenticated,
  authorized,
  async (ctx: Context): Promise<void> => {
    const inputData: unjoinClubInput = {
      clubId: ctx.params.clubId,
      userId: ctx.params.userId,
    }
    
    await unjoinClub.execute(inputData)

    ctx.ok()
  },
])
