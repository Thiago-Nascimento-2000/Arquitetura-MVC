import { User } from "../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ENV } from "../../lib/env.js";


class LoginUserController {
    async handle(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ msg: "Preencha todos os campos!" });
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ msg: "Credenciais inválidas!" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ msg: "Credenciais inválidas!" });
            }

            const token = jwt.sign(
                { id: user.id },
                ENV.JWT_SECRET,
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                msg: "Login realizado com sucesso!",
                token
            });

        } catch (error) {
            return res.status(500).json({ msg: "Erro interno no servidor", error: error.message });
        }
    }
}

export { LoginUserController };