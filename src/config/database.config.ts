import mongoose from "mongoose";

export const dbConnect = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL muhit o'zgaruvchisi aniqlanmagan");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB ga muvaffaqiyatli ulandi!");
  } catch (error) {
    console.error("MongoDB ulanishida xatolik:", error);
    process.exit(1);
  }
};
