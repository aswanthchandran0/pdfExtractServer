import { Request, Response } from "express";
import { userModel } from "../../model/user";
import bcrypt from "bcryptjs";
import { generateToken } from "./jwtTokenService";

export const sigin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("entering in user not exist");
      res.status(404).json({ error: "user not found" });
      return;
    }
    console.log("after the user not exist");
    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch) res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT token for the user
    const token = generateToken(user?.id);
    res.status(200).json({ token, user });
    return;
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ error: (err as Error).message });
    return;
  }
};
  