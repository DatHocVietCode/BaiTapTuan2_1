import bcrypt from 'bcryptjs';
import User from '../models/Users';

interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

// Tạo user mới
export const createNewUser = async (data: CreateUserData) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      ...data,
      password: hashPassword
    });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Lấy tất cả user
export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Lấy user theo ID
export const getUserById = async (id: number) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Update user
export const updateUser = async (id: number, newData: Partial<CreateUserData>) => {
  try {
    if (newData.password) {
      const salt = await bcrypt.genSalt(10);
      newData.password = await bcrypt.hash(newData.password, salt);
    }

    const [updatedRows] = await User.update(newData, {
      where: { id }
    });

    return updatedRows; // số bản ghi được update
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Xóa user
export const deleteUser = async (id: number) => {
  try {
    const deletedRows = await User.destroy({
      where: { id }
    });

    return deletedRows; // số bản ghi bị xóa
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
