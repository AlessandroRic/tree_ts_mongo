import { Router } from 'express'
import User from '../controllers/user'
import validation from '../validation/user'

const userRoutes = Router();

userRoutes.post('/', validation.upsert, User.create)
userRoutes.get('/:id', validation.objectId, User.getOne)
userRoutes.get('/', User.getAll)
userRoutes.put('/:id', validation.objectId, validation.upsert, User.update)
userRoutes.delete('/:id', validation.objectId, User.delete)

export { userRoutes };