import { Request, Response } from "express";
import { userModel } from "../../model/user";
import bcrypt from "bcryptjs"; // Import bcryptjs

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const user = new userModel({ name, email, password: hashedPassword });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ error: (err as Error).message });
  }
};
