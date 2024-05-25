import Router from 'koa-router'
import { handleErrors, handleNotFound } from '../middleware/errors'
import * as controllers from '../controllers/v1'
import { Context } from 'koa'

const router = new Router<{}, Context> ({ prefix: '/v1' })

router.use(handleErrors)

router.post('/sessions/create', controllers.session.create)
router.post('/sessions/refresh', controllers.session.refresh)

//-------------- users ----------------------------------------//
router.patch('/users/:userId', controllers.user.patch)
router.delete('/users/:userId', controllers.user.remove)
router.get('/users/me', controllers.user.me)
router.post('/users', controllers.user.create)

//-------------- clubs ----------------------------------------//
router.patch('/users/:userId/clubs/:id', controllers.club.patch)
router.delete('/users/:userId/clubs/:id', controllers.club.remove)
router.get('/users/:userId/clubs/:id', controllers.club.get)
router.get('/clubs', controllers.club.getAll)
router.post('/users/:userId/clubs', controllers.club.create)

router.use(handleNotFound)

export const v1Routes = router.routes()
