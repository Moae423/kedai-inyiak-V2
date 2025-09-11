import express from "express";
import {
  checkHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
  totalUserHandler,
} from "../controller/auth.controller";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../schema/auth.schema";
const router = express.Router();

router.post("/register", validate(registerSchema), registerHandler);
router.post("/login", validate(loginSchema), loginHandler);
router.post("/logout", logoutHandler);
router.get("/check", checkHandler);
router.get("/total", totalUserHandler);
export default router;

testing;
