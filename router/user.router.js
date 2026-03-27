import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
} from "../controller/user.controller.js";

export const userRouter = Router();
userRouter
    .get("/users", getAllUsers)
    .get("/users/:id", getUserById)
    .post("/users", createUser);
