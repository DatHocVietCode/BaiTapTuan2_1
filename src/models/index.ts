// src/models/index.ts
import { Sequelize } from "sequelize";
import { Users } from "./Users"; // đúng đường dẫn tới file User.ts của bạn

// Tạo Sequelize instance (dùng config trong .env)
export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Init models
Users.initModel(sequelize);

const db = {
  sequelize,
  Users,
};

export default db;
