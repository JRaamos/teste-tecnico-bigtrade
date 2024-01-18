import express from 'express';
import connectToDatabase from './db/mongodb.config';
import userRouter from './routers/user.router';

const app = express();

app.use(express.json());
connectToDatabase()

app.use(userRouter);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default server;

