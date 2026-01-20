import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import templeRoutes from "./routes/templeRoutes.js";
import bhaktaRoutes from "./routes/bhaktaRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/temples", templeRoutes);
app.use("/api/bhaktas", bhaktaRoutes);
app.use("/api/community", communityRoutes);
app.use(globalErrorHandler);

export default app;
