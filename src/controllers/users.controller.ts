import { Request, Response } from "express";
import { User } from "../models/user.model";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      per_page = 10,
      order_column = "created_at",
      order_type = "desc",
      role,
      gender,
      search,
      name,
      email,
      phone,
      nationality,
      address,
    } = req.query;

    const filter: any = {};

    if (role) filter.role = { $regex: role, $options: "i" };
    if (gender) filter.gender = { $regex: gender, $options: "i" };
    if (name) filter.name = { $regex: name, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (phone) filter.phone = { $regex: phone, $options: "i" };
    if (nationality) filter.nationality = { $regex: nationality, $options: "i" };
    if (address) filter.address = { $regex: address, $options: "i" };

    if (search) {
      const searchRegex = { $regex: search as string, $options: "i" };
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { nationality: searchRegex },
        { address: searchRegex },
      ];
    }

    const sortOptions: any = {};
    const sortField = (order_column as string) || "created_at";
    const sortDirection = order_type === "asc" ? 1 : -1;
    sortOptions[sortField] = sortDirection;

    const pageInt = parseInt(page as string, 10);
    const pageSizeInt = parseInt(per_page as string, 10);

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort(sortOptions)
      .skip((pageInt - 1) * pageSizeInt)
      .limit(pageSizeInt);

    res.status(200).json({
      success: true,
      message: "Foydalanuvchilar muvaffaqiyatli olindi",
      data: users,
      page: pageInt,
      per_page: pageSizeInt,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Foydalanuvchilarni olishda xatolik yuz berdi",
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Foydalanuvchi muvaffaqiyatli yaratildi",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Foydalanuvchini yaratishda xatolik",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Foydalanuvchi topilmadi",
        error: "NotFound",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Foydalanuvchi topildi",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Foydalanuvchini olishda xatolik",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "Foydalanuvchi topilmadi",
        error: "NotFound",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Foydalanuvchi muvaffaqiyatli yangilandi",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Foydalanuvchini yangilashda xatolik",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: "Foydalanuvchi topilmadi",
        error: "NotFound",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Foydalanuvchi muvaffaqiyatli o‘chirildi",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Foydalanuvchini o‘chirishda xatolik",
      error: error instanceof Error ? error.message : error,
    });
  }
};
