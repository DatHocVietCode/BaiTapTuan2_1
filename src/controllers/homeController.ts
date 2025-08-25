import { Request, Response } from "express";
import db from "../models";
import * as CRUDService from "../services/CRUDService";

// Trang chủ
export const getHomePage = async (req: Request, res: Response) => {
  try {
    return res.render("home.ejs");
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Internal Server Error");
  }
};
export const getCRUDOperations = (req: Request, res: Response) => {
  return res.render("crud.ejs");
};
// Trang giới thiệu
export const getAboutPage = (req: Request, res: Response) => {
  return res.render("test/about.ejs");
};

// View tất cả user - Cách 1: trực tiếp từ model
export const getCRUD = async (req: Request, res: Response) => {
  try {
    let datalist = await db.Users.findAll(); // await để lấy dữ liệu thực
    return res.render("users/findAllUser.ejs", { datalist });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Hiển thị tất cả user
export const getFindAllCrud = async (req: Request, res: Response) => {
  try {
    let data = await CRUDService.getAllUsers();
    return res.render("users/findAllUser.ejs", { datalist: data });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// Tạo mới user
export const postCRUD = async (req: Request, res: Response) => {
  try {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("Post CRUD from server");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// Lấy user để edit
export const getEditCRUD = async (req: Request, res: Response) => {
  const idParam = req.query.id as string;
  const userId = parseInt(idParam, 10);

  if (!isNaN(userId)) {
    try {
      let userData = await CRUDService.getUserById(userId);
      return res.render("users/updateUser.ejs", { data: userData });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.send("User not found");
  }
};

// Cập nhật user
export const postUpdateCRUD = async (req: Request, res: Response) => {
  try {
    const { id, ...newData } = req.body; // tách id và data
    
    const updatedRows = await CRUDService.updateUser(Number(id), newData);

    if (updatedRows > 0) {
      return res.send("Update user successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send("Internal Server Error");
  }
};


// Xóa user
export const deleteCRUD = async (req: Request, res: Response) => {
  const idParam = req.query.id as string;
  const userId = parseInt(idParam, 10);

  if (!isNaN(userId)) {
    try {
      await CRUDService.deleteUser(userId);
      return res.send("Delete user successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.send("User not found");
  }
};
export const putCRUD = async (req: Request, res: Response) => {
  try {
    // Lấy dữ liệu từ form
    const { id, firstName, lastName, address } = req.body;

    if (!id) {
      return res.status(400).send("User ID is required");
    }

    // Chuyển id sang number nếu cần
    const userId = Number(id);

    // Tạo object data để update
    const updatedData = {
      firstName,
      lastName,
      address,
    };

    // Gọi service để update
    const updatedUser = await CRUDService.updateUser(userId, updatedData);

    // Redirect về trang danh sách user sau khi update
    return res.redirect("/get-crud");
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send("Internal Server Error");
  }
}

