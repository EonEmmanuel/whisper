import express from "express";
import { clerkMiddleware } from "@clerk/express";

import cors from "cors";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandling";

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({ status: "okay", message: "server is running fine" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
