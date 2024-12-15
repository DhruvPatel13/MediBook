import express from "express";
import {
  doctorList,
  loginDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorProfile,
  updateDoctorProfile,
  appointmentDoctor,
  doctorDashboard,
} from "../controllers/doctorControllers.js";
import doctorAuth from "../middlewares/doctorAuth.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", doctorAuth, appointmentDoctor);
doctorRouter.put("/complete-appointment", doctorAuth, appointmentComplete);
doctorRouter.put("/cancel-appointment", doctorAuth, appointmentCancel);
doctorRouter.get("/dashboard", doctorAuth, doctorDashboard);
doctorRouter.get("/profile", doctorAuth, doctorProfile);
doctorRouter.put("/update-profile", doctorAuth, updateDoctorProfile);

export default doctorRouter;
