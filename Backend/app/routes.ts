import express from "express";
import userRoutes from "./user/user.route"
import adsRoutes from "./ads/ads.route"
import adminRoutes from "./admin/admin.route"
const router = express.Router();

router.use("/users",userRoutes)
router.use("/admin",adminRoutes)
router.use("/ads",adsRoutes)

export default router;