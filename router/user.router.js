import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getPostCount,
    getUserById,
} from "../controller/user.controller.js";

export const userRouter = Router();
userRouter
    .get("/users", getAllUsers)
    .get("/users/:id", getUserById)
    .post("/users", createUser)
    .get("/users/:id/posts-count", getPostCount);
