import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
export const signupUser = async (req, res) => {
  const { email, fullNames, password, confirmPassword } = req.body;

  try {
    const user = await User.signup(email, fullNames, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.log("debugger", error);
    res.status(400).json({ error: error.message });
  }
};

export default signupUser;
