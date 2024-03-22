import authModel from "../models/auth.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { decryptPassword, encyrptPassword } from "../utils/bcrypt.utill";

const login = async (
  req: { body: { email: string; password: string } },
  res: any
) => {
  try {
    const { email, password } = req.body;
    const findExistingMail = await authModel.findOne({ email });
    if (findExistingMail) {
      const comparePassword = await decryptPassword(
        password,
        findExistingMail.password
      );
      if (comparePassword) {
        var id = findExistingMail._id;
        const token = jwt.sign({ id }, process.env.SECRET_KEY, {
          expiresIn: "2hrs"
        });
        res.status(200).json({ message: "Login Successful", token });
      } else {
        res.status(403).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(404).json({ message: "User does not have an account" });
    }
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

const registerAUser = async (
  req: { body: { username: string; email: string; password: string } },
  res: any
) => {
  try {
    const { username, email, password } = req.body;
    const findExistingMail = await authModel.findOne({ email });
    if (!findExistingMail) {
      const hashedPassword = await encyrptPassword(password);
      await authModel.create({
        username,
        email,
        password: hashedPassword
      });
      const findId = await authModel.findOne({ email });
      var id = findId._id;
      const token = jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "2hrs"
      });
      res.status(200).json({ message: "Account Created", token });
    } else {
      res.status(403).json({ message: "User already have an account" });
    }
  } catch (error: any) {
    res.status(501).json({ message: error.message });
  }
};
const accessPayload = async (
  req: { headers: { authorization: string }; body: { auth: string } },
  res: any,
  next: any
) => {
  try {
    const token = req.headers.authorization;
    var tokenArray = token.split("");
    var justTokenArray = tokenArray.splice(7);
    var justToken = justTokenArray.join("");
    var { id } = jwt.verify(justToken, process.env.SECRET_KEY) as JwtPayload;
    req.body.auth = id;

    next();
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
export { registerAUser, login, accessPayload };
