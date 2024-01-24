import express from "express";
import userRouter from "./routers/user.router";
import postRouter from "./routers/post.router";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(helmet());
app.disable("x-powered-by");

app.use(userRouter);
app.use(postRouter);

export default app;
