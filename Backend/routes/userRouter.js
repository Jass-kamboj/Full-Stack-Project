import express from "express";
import { logIn, signUp } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn)

export default userRouter;