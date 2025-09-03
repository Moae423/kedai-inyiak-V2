import express from "express";
import {
  checkHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../controller/auth.controller";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../schema/auth.schema";
const router = express.Router();

router.post("/register", validate(registerSchema), registerHandler);
router.post("/login", validate(loginSchema), loginHandler);
router.post("/logout", logoutHandler);
router.get("/check", checkHandler);
export default router;
