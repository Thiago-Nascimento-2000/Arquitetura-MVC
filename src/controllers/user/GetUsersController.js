import { User } from "../../models/User.js";

class GetUsersController {
    async handle(req, res) {
        try {
            const users = await User.findAll()
            
            return res.status(200).json(users)
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { GetUsersController }