import { Router } from "express"
import { checkToken } from "./middlewere/auth.middlewere.js"
const router = Router()

//IMPORTS
import { CreateUserController } from "./controllers/user/RegisterUserController.js"
import { GetUsersController } from "./controllers/user/GetUsersController.js"
import { LoginUserController } from "./controllers/user/LoginUserController.js"

//USERS
router.post('/register', new CreateUserController().handle)
router.get("/users", checkToken, new GetUsersController().handle)
router.post("/login", new LoginUserController().handle)

export { router }