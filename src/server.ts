import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { dbConnect } from "./config/database.config";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());
app.use(cors());

dbConnect();

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishlamoqda`);
});
