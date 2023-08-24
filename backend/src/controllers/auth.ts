import { RequestHandler } from "express";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

interface SignupBody {
  username?: string;
  email?: string;
  password?: string;
}


export const Signup: RequestHandler<
  unknown,
  unknown,
  SignupBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password: passwordRaw } = req.body;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing.");
    }

    const existingUsername = await userModel
      .findOne({ username: username })
      .exec();
    const existingEmail = await userModel.findOne({ email: email }).exec();

    if (existingUsername) {
      throw createHttpError(409, "Username already taken");
    }

    if (existingEmail) {
      throw createHttpError(409, "Email already taken");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};


interface LoginBody {
  email?: string;
  password?: string;
}

export const Login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await userModel
      .findOne({ email: email })
      .select("+password +username")
      .exec();

    if (!user) {
      throw createHttpError(404, "User doesnt exists");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const Logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
