import { Sequelize } from "sequelize"
import { ENV } from "./env.js"

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    dialect: 'mysql'
})

//test connection
export const Connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");
    
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Não foi possível conectar ao banco:", error);
  }
};

export { sequelize }