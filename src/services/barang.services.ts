import prisma from "../lib/prisma";
import { barangInput } from "../schema/barang.schema";

export const CreateBarangServices = async (data: barangInput) => {
  const barang = await prisma.barang.create({ data });
  return barang;
};

export const GetAllBarangServices = async () => {
  return prisma.barang.findMany({
    select: {
      id: true,
      name: true,
      harga: true,
      stok: true,
      tglMasuk: true,
    },
  });
};

export const GetBarangByIdServices = async (id: string) => {
  return prisma.barang.findUnique({
    where: { id },
    select: { id: true, name: true, harga: true, stok: true, tglMasuk: true },
  });
};

export const UpdateBarangServices = async (id: string, data: barangInput) => {
  return prisma.barang.update({ where: { id }, data });
};

export const DeleteBarangServices = async (id: string) => {
  return prisma.barang.delete({ where: { id } });
};
