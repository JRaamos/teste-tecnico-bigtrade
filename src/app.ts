import express from "express";
import userRouter from "./routers/user.router";
import postRouter from "./routers/post.router";

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(postRouter);

export default app;
