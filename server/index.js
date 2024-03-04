import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./src/router/user.js";
import bookRouter from "./src/router/book.js";

const app = express();
app.use(express.json());

app.use(cors());

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

app.use("/v1/user", userRouter);
app.use("/v1/book", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
