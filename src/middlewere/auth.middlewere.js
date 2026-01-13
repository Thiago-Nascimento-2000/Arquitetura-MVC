import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({msg: "not token provided"})
    }

    try {
        const secret = ENV.JWT_SECRET
        jwt.verify(token, secret)

        next()

    } catch(error) {
        res.status(400).json({msg: "Token inválido!"})
    }
}

export { checkToken }