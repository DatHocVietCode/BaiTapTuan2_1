import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UsersAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  gender?: number;
  image?: string;
  roleId?: string;
  positionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Khóa chính
export type UsersPk = "id";
export type UsersId = Users[UsersPk];

// Các field có thể null khi tạo mới
export type UsersOptionalAttributes =
  | "id"
  | "address"
  | "phoneNumber"
  | "gender"
  | "image"
  | "roleId"
  | "positionId"
  | "createdAt"
  | "updatedAt";

export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes>
  implements UsersAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public address?: string;
  public phoneNumber?: string;
  public gender?: number;
  public image?: string;
  public roleId?: string;
  public positionId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  static initModel(sequelize: Sequelize): typeof Users {
    Users.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        gender: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        roleId: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        positionId: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "Users",
        timestamps: true, // Sequelize sẽ tự động quản lý createdAt và updatedAt
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "email",
            unique: true,
            using: "BTREE",
            fields: [{ name: "email" }],
          },
        ],
      }
    );
    return Users;
  }
}

export default Users;
