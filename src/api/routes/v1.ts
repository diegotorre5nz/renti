import Router from 'koa-router'
import { handleErrors, handleNotFound } from '../middleware/errors'
import * as controllers from '../controllers/v1'
import { Context } from 'koa'

const router = new Router<{}, Context> ({ prefix: '/v1' })

router.use(handleErrors)

router.post('/sessions/create', controllers.session.create)
router.post('/sessions/refresh', controllers.session.refresh)

router.patch('/users/:id', controllers.user.patch)
router.delete('/users/:id', controllers.user.remove)
router.get('/users/me', controllers.user.me)
router.post('/users', controllers.user.create)

router.use(handleNotFound)

export const v1Routes = router.routes()
