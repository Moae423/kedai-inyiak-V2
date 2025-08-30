import { z } from "zod";
export const barangSchema = z.object({
  id: z.uuid("Invalid UUID").optional(),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name must be less than 20 characters" }),
  harga: z.coerce.number().min(1, { message: "Harga is required" }),
  stok: z.coerce.number().min(1, { message: "Stok is required" }),
  tglMasuk: z.coerce.date({ message: "Tanggal Masuk is required" }),
});
export type barangInput = z.infer<typeof barangSchema>;
