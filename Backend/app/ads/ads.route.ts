import { Router } from "express";
import { adController } from "./ads.controller";
import { verifyToken } from "../common/middleware/verify";
const router = Router();


router.get("/view/:adId", adController.viewAd);
router.post("/click/:adId", adController.clickAd); 
router.post("/create",verifyToken, adController.createAd);
router.get("/all", adController.getAllAds);

export default router;
