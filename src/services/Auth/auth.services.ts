import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { loginInput, registerInput } from "../../schema/auth.schema";
export const registerServices = async (data: registerInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  return { id: user.id, email: user.email };
};

export const LoginServices = async (data: loginInput) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  return user;
};

export const TotalUserServices = async () => {
  const total = await prisma.user.count();
  return total;
};
