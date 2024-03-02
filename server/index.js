import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/model/user_model.js";
import userRouter from "./src/router/user.js";
import bookRouter from "./src/router/book.js";

const app = express();
app.use(express.json());
const port = 3000;
dotenv.config();

const uri = process.env.MONGOURL;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.get("/create", async (req, res) => {
  const demoUser = new User({
    username: "demo11_user",
    email: "demo11@example.com",
    password: "demo_password",
  });
  const savedUser = await demoUser.save();
  console.log(savedUser);
});

app.use("/user", userRouter);
app.use("/book", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
