import exp from "constants";
import express from "express";
const router = express.Router();
import { adminController } from "./admin.controller";
import { catchError } from "../common/middleware/cath-error.middleware";
import { registerValidator,loginValidator} from "./admin.validator";
import { rateLimiter } from "../common/middleware/rate-limiter.middleware";

import { refreshToken } from "../common/services/refreshtoken.controller";




router.post("/login",loginValidator,rateLimiter, catchError, adminController.adminLogin);
router.post("/register",registerValidator,rateLimiter,catchError,adminController.adminRegister);
 router.post("/refresh-token", refreshToken)

export default router;