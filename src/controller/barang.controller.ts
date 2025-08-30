import { NextFunction, Request, Response } from "express";
import { barangInput, barangSchema } from "../schema/barang.schema";
import * as barangservices from "../services/barang.services";
export const createBarangHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: barangInput = barangSchema.parse(req.body);
  try {
    const barang = await barangservices.CreateBarangServices(data);
    res.status(201).json({
      message: "Data Barang Has Been Created",
      data: { barang },
      success: true,
      error: null,
    });
    return barang;
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Data Barang Has Not Been Created",
      data: null,
      success: false,
      error: error,
    });
  }
};

export const getAllBarangHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await barangservices.GetAllBarangServices();
    res.status(200).json({
      message: "Data Barang Showed Up",
      data: { data },
      success: true,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Data Barang Not Showed Up",
      data: null,
      success: false,
      error: error,
    });
    return;
  }
};

export const getBarangByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await barangservices.GetBarangByIdServices(id);
    res.status(200).json({
      message: "Data Barang  Showed Up",
      data: { data },
      success: true,
      error: null,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Data Barang Not Showed Up",
      data: null,
      success: false,
      error: error,
    });
    return;
  }
};

export const updateBarangHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validate = req.body;
    // Hapus properti 'id' dari body untuk mencegahnya diedit
    const deleteId = validate.id;
    if (deleteId) {
      res.status(400).json({
        message: "ID cannot be updated directly from the request body.",
        data: null,
        success: false,
        error: "Invalid request: 'id' property is not allowed in the body.",
      });
      return;
    }

    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }
    const barang = await barangservices.GetBarangByIdServices(id);
    if (!barang) {
      res.status(404).json({ message: "Barang not found" });
      return;
    }

    const updatedBarang = await barangservices.UpdateBarangServices(
      id,
      validate
    );
    res.status(200).json({
      message: "Data Barang Has Been Updated",
      data: { updatedBarang },
      success: true,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Data Barang Has Not Been Updated",
      data: null,
      success: false,
      error: error,
    });
  }
};

export const deleteBarangHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const barang = await barangservices.GetBarangByIdServices(id);
    if (!barang) {
      res.status(404).json({
        message: "Data Barang Has Not Been Found",
        data: barang,
        success: true,
        error: null,
      });
      return;
    }
    const data = await barangservices.DeleteBarangServices(id);
    res.status(200).json({
      message: "Data Barang Has Been Deleted",
      data: { data },
      success: true,
      error: null,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Data Barang Has Not Been Deleted",
      data: null,
      success: false,
      error: true,
    });
  }
};
