import express from "express";
import { validate } from "../middleware/validate";
import { barangSchema } from "../schema/barang.schema";
import * as barangController from "../controller/barang.controller";
import { authenticateToken } from "../middleware/AuthMiddleware";
const router = express.Router();

router.use(authenticateToken);
router.post("/", validate(barangSchema), barangController.createBarangHandler);
router.get("/", barangController.getAllBarangHandler);
router.get("/:id", barangController.getBarangByIdHandler);
router.put("/:id", barangController.updateBarangHandler);
router.delete("/:id", barangController.deleteBarangHandler);
router.get("/barang/total", barangController.totalBarangHandler);
export default router;
