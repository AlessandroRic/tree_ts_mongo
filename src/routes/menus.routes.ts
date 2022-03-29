import { Router } from 'express'
import Menu from '../controllers/menu'
import validation from '../validation/menu'

const menuRoutes = Router();

menuRoutes.post('/', validation.upsert, Menu.create)
menuRoutes.get('/', Menu.getAll)
menuRoutes.delete('/:id', validation.objectId, Menu.delete)

export { menuRoutes };