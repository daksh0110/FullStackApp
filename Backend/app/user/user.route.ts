
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";

import userController from "./user.controller";
import { refreshToken } from "../common/services/refreshtoken.controller";
import { loginValidator, registerValidator } from "./user.validation";
import { verifyToken } from "../common/middleware/verify";


 const router = Router();

 router
         .post("/register",registerValidator, catchError,userController.registerUserController)
         .post("/login",loginValidator, catchError,userController.loginUserController)
         .post("/refresh-token", refreshToken)
         .put("/wallet", catchError,userController.wallerController)
         .get("/wallet/:id", catchError,userController.getWalletBalanceController)
      


 export default router;

