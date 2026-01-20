
console.log("SERVER FILE LOADED");

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 💥", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE 💥", err);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.get("/log", (req, res) => {
  res.send("API WORKING");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
