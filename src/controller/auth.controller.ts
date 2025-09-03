import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { generateToken } from "../lib/jwt";
import * as AuthServices from "../services/Auth/auth.services";
import { loginInput, loginSchema } from "../schema/auth.schema";
import jwt from "jsonwebtoken";
import { email } from "zod";

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await AuthServices.registerServices(req.body);
    res.status(201).json({
      message: "Data User Has Been Created",
      data: { user },
      success: true,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Data User Has Not Been Created",
      data: null,
      success: false,
      error: error,
    });
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data: loginInput = loginSchema.parse(req.body);
    const user = await AuthServices.LoginServices(data);
    if (!user) {
      res.status(404).json({
        message: "User Not Found",
        data: null,
        success: false,
        error: null,
      });
      return;
    }
    const isMatch = await bcrypt.compare(data.password, user?.password);
    if (!isMatch) {
      res.status(400).json({ message: "Password Salah" });
      return;
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    }); // naming lebih jelas
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true hanya jika HTTPS (misal di production)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({
      message: "Login Success",
      data: { token: token, message: "Login Success", success: true },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const checkHandler = async (request: Request, response: Response) => {
  try {
    const token =
      request.cookies?.token || request.headers["authorization"]?.split(" ")[1];
    if (!token) {
      response.status(401).json({ message: "token not found", success: false });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      name: string;
      email: string;
    };
    return response.json({
      success: true,
      user: {
        userId: decoded.id,
        name: decoded.name,
        email: decoded.email,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(401).json({
      message: "Invalid token",
      success: false,
      user: {},
    });
  }
};
export const logoutHandler = async (requst: Request, response: Response) => {
  try {
    response.clearCookie("token");
    response
      .status(200)
      .json({ message: "Berhasil Logout!", success: true, error: null });
  } catch (error) {
    console.log(error);
    response.status(400).json({ message: "Gagal Logout!", success: false });
  }
};
