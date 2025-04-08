import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  role: "Admin" | "User" | "Guest";
  email: string;
  phone: string;
  gender: "male" | "female";
  nationality: string;
  address: string;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["Admin", "User", "Guest"], required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  nationality: { type: String, required: true },
  address: { type: String, required: true },
  birth_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
