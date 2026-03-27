import { Router } from "express";
import {
    createComment,
    deleteComment,
    getCommentByPostId,
} from "../controller/comment.controller.js";

export const commentRouter = Router();

commentRouter
    .post("/comments", createComment)
    .get("/posts/:id/comments", getCommentByPostId)
    .delete("/comments/:id", deleteComment);
