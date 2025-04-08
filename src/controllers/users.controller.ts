import { Request, Response } from "express";
import { User } from "../models/user.model";

// 🔹 Barcha foydalanuvchilar (pagination + filter)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, page_size = 10, role, gender } = req.query;

    const filter: any = {};
    if (role) {
      filter.role = { $regex: role, $options: "i" };
    }
    if (gender) {
      filter.gender = { $regex: gender, $options: "i" };
    }

    const pageInt = parseInt(page as string, 10);
    const pageSizeInt = parseInt(page_size as string, 10);

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .skip((pageInt - 1) * pageSizeInt)
      .limit(pageSizeInt);

    res.json({
      data: users,
      page: pageInt,
      page_size: pageSizeInt,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 Yangi user qo‘shish
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 ID bo‘yicha user olish
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User topilmadi" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 User yangilash
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: "User topilmadi" });
      return;
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 User o‘chirish
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "User topilmadi" });
      return;
    }
    res.json({ message: "User o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};
