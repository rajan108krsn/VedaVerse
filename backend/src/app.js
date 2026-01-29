console.log("🔥 APP.JS LOADED 🔥");
import authRoutes from "./routes/authRoutes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
import cookieParser from "cookie-parser";
app.use(cookieParser()); // 🔥 ROUTES SE PEHLE
/* ✅ CORS – yahi kaafi hai */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server OK");
});
// app.post("/api/auth/refresh-token", (req, res) => {
//   console.log("🍪 Refresh token HIT");
//   return res.status(200).json({
//     accessToken: "dummy-token",
//   });
// });

console.log("Auth routes mounted at /auth/api");

export default app;
