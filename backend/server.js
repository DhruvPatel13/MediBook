import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
import userRouter from "./routes/userRoutes.js";

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// MIDDLEWARES
app.use(express.json());
app.use(cors({origin: "*"}));

// API ENDPOINTS
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Backend is live :)");
});

// PORT
app.listen(port, "0.0.0.0", () =>
  console.log("Sever Running At- localhost:" + port)
);
