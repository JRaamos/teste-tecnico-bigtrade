import express from "express";
import connectToDatabase from "./db/mongodb.config";
import userRouter from "./routers/user.router";
import postRouter from "./routers/post.router";

const app = express();
app.disabled("x-powered-by");


app.use(express.json());

app.use(userRouter);
app.use(postRouter)


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () =>
  console.log(`Server is running on PORT: ${PORT}`, await connectToDatabase())
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default server;
