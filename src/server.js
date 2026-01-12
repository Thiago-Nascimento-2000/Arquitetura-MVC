import express from "express"
import cors from "cors"
import { ENV } from "./lib/env.js"
import { Connection } from "./lib/db.js"

//create express app
const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: `${ENV.HOST}:${ENV.PORT}`}))

//routes
import { router } from "./routes.js"
app.use(router)

//start server
const startServer = () => {
  try {
    app.listen(ENV.PORT, () => {
      console.log(`Servidor rodando em ${ENV.HOST}:${ENV.PORT}`);
      Connection();
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    throw new Error(error.message);
  }
};

startServer();



