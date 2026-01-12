import { User } from "../../models/User.js";

class CreateUserController {
  async handle(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
      }

      //verify if user already exists
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const user = await User.create({ name, email, password });
      return res.status(201).json(user);

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController }
