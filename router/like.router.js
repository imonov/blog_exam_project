import { Router } from "express";
import { likeComment, unlikeComment } from "../controller/like.controller.js";

export const likeRouter = Router();

likeRouter
    .post("/posts/:id/like", likeComment)
    .delete("/posts/:id/like", unlikeComment);
