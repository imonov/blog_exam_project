import { Router } from "express";
import { userRouter } from "./user.router.js";
import { postRouter } from "./post.router.js";
import { commentRouter } from "./comment.router.js";
import { likeRouter } from "./like.router.js";

export const apiRouter = Router();
apiRouter.use(userRouter, postRouter, commentRouter, likeRouter);
