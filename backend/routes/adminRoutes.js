import express from "express";
import {
  addDoctor,
  loginAdmin,
  appointmentsAdmin,
  allDoctors,
  appointmentCancel,
  adminDashboard,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";
import { changeAvailability } from "../controllers/doctorControllers.js";

const adminRouter = express.Router();

adminRouter.post(
  "/add-doctor",
  adminAuth,
  upload.single("image"),
  addDoctor
);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/all-doctors", adminAuth, allDoctors);
adminRouter.put("/change-availability", adminAuth, changeAvailability);
adminRouter.get("/appointments", adminAuth, appointmentsAdmin);
adminRouter.put("/cancel-appointment", adminAuth, appointmentCancel);
adminRouter.get("/dashboard", adminAuth, adminDashboard);

export default adminRouter;
