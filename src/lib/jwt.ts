import jwt from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

export const generateToken = (payload: object) => {
  return jwt.sign(payload, secret_key, { expiresIn: JWT_EXPIRES_IN } as any);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret_key);
};
