import { Router } from 'express'
import { auth } from '../middlewares/auth.js'
import * as users from '../controllers/usersController.js'
import * as meals from '../controllers/mealsController.js'

export const routes = Router()

// Públicas
routes.post('/users', users.create)
routes.post('/login', users.login)

// Protegidas (exigem o header x-user-id)
routes.use(auth)

routes.get('/meals', meals.list)
routes.post('/meals', meals.create)
routes.get('/meals/:id', meals.show)
routes.put('/meals/:id', meals.update)
routes.delete('/meals/:id', meals.remove)

routes.get('/metrics', meals.metrics)
