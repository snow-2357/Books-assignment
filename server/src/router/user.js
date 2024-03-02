import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user_model.js";

const router = express.Router();

router.use(express.json());

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPW = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Username or email already exists" });
    }

    const user = new User({ username, email, password: hashedPW });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "password", {
      expiresIn: "1h",
    });
    res.status(201).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ userId: user._id }, "password", {
      expiresIn: "1h",
    });

    res.status(201).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send("Error");
  }
});

export default router;
