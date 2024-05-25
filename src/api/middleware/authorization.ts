import { Context, Next } from 'koa'
import { UnauthorizedError } from '../../utils/errors'
import { Console } from 'console'

export async function authorized(ctx: Context, next: Next) {
  if (!ctx) {
    throw new Error('Context has to be defined')
  }

  if (!ctx.params.userId) {
    throw new Error('Call Atuhentication Middleware before Authorization')
  }
  console.log(ctx.state.userId)
  console.log(ctx.params.userId)
  // Validates that the resource to be accessed belongs to the authenticated user
  if (ctx.state.userId != ctx.params.userId) {
    throw new UnauthorizedError()
  }
  
  return next()
}

module.exports = {
  authorized,
}