import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  role: "Admin" | "User" | "Guest";
  email: string;
  phone: string;
  gender: "male" | "female";
  status: "active" | "inActive";
  nationality: string;
  address: string;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: false },
  role: { type: String, enum: ["Admin", "User", "Guest"], required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  gender: { type: String, enum: ["male", "female"], required: false },
  status: { type: String, enum: ["active", "inActive"], required: false },
  nationality: { type: String, required: false },
  address: { type: String, required: false },
  birth_date: { type: Date, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
