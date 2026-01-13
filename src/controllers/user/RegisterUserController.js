import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";

class CreateUserController {
  async handle(req, res) {
    try {
      const { name, email, password, confirmpassword } = req.body;

      if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({ error: "Name, email, password, and confirm password are required" });
      }

      if (password !== confirmpassword) {
        return res.status(400).json({ error: "Password and confirm password do not match" });
      }

      //verify if user already exists
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      //hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      //create user
      const user = await User.create({ name, email, password: hashedPassword });
      return res.status(201).json(user);

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController }
