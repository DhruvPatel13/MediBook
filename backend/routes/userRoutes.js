import express from "express";
import upload from "../middlewares/multer.js";
import userAuth from "../middlewares/userAuth.js";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", userAuth, getProfile);
userRouter.put(
  "/update-profile",
  upload.single("image"),
  userAuth,
  updateProfile
);
userRouter.post("/book-appointment", userAuth, bookAppointment);
userRouter.get("/appointments", userAuth, listAppointment);
userRouter.put("/cancel-appointment", userAuth, cancelAppointment);
userRouter.post("/payment-razorpay", userAuth, paymentRazorpay);
userRouter.post("/verify-razorpay", userAuth, verifyRazorpay);

export default userRouter;
