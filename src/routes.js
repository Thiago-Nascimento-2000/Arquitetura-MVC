import { Router } from "express"
const router = Router()

//IMPORTS
import { CreateUserController } from "./controllers/user/UserController.js"
import { GetUsersController } from "./controllers/user/GetUsersController.js"

//USERS
router.post('/register', new CreateUserController().handle)
router.get("/users", new GetUsersController().handle)

export { router }