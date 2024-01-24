import app from "./app";
import connectToDatabase from "./db/mongodb.config";

const PORT = process.env.PORT || 3000;

connectToDatabase();

const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT}`)
);

export default server;