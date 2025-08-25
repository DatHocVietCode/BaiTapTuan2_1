import { Request, Response } from "express";
import db from "../models";
import * as CRUDService from "../services/CRUDService";

// Trang chủ
export const getHomePage = async (req: Request, res: Response) => {
  try {
    let users = await db.Users.findAll();
    console.log("-----------------------------");
    console.log(users);
    console.log("-----------------------------");

    return res.render("home.ejs", { data: JSON.stringify(users) });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// Trang giới thiệu
export const getAboutPage = (req: Request, res: Response) => {
  return res.render("test/about.ejs");
};

// Trang CRUD chính
export const getCRUD = (req: Request, res: Response) => {
  return res.render("crud.ejs");
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
