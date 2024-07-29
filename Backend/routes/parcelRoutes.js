import express from "express";
import parcelController from "../controllers/parcelController.js";
import { verifyToken, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/addParcel", verifyToken, parcelController.addParcel);

router.get("/userParcel", parcelController.userParcel);
router.get("/allParcels", verifyTokenAndAuthorization, parcelController.getAllParcels);
router.get("/:id", parcelController.getOneParcel);

router.put("/updateParcel/:id", parcelController.updateParcel);

router.delete("/deleteParcel/:id", parcelController.deleteParcel);

export default router;
