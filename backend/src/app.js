import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
// import templeRoutes from "./routes/templeRoutes.js";
// import leelaRoutes from "./routes/leelaRoutes.js";
// import bhaktaRoutes from "./routes/bhaktaRoutes.js";
// import communityRoutes from "./routes/communityRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

// app.use("/api/temples", templeRoutes);
// app.use("/api/leelas", leelaRoutes);
// app.use("/api/bhaktas", bhaktaRoutes);
// app.use("/api/community", communityRoutes);

export default app;
