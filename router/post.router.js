import { Router } from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    getPostByUserId,
    getPostLikesCount,
    updatePost,
} from "../controller/post.controller.js";

export const postRouter = Router();

postRouter
    .get("/posts", getAllPosts)
    .get("/posts/:id", getPostById)
    .post("/posts", createPost)
    .put("/posts/:id", updatePost)
    .delete("/posts/:id", deletePost)
    .get("/users/:id/posts", getPostByUserId)
    .get("/posts/:id/likes-count", getPostLikesCount);
