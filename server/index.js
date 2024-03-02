import express from "express";
import mongoose from "mongoose";
import User from "./src/model/user_model.js";

const app = express();
const port = 3000;

const uri =
  "mongodb+srv://sima:zPeyicxelMFzGy9b@cluster0.kdrhvt4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
