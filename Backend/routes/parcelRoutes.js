import express from "express";
import parcelController from "../controllers/parcelController.js";

const router = express.Router();

router.post("/addParcel", parcelController.addParcel);

router.get("/allParcels", parcelController.getAllParcels);
router.get("/:id", parcelController.getOneParcel);
router.get("/userParcel", parcelController.userParcel);

router.put("/updateParcel/:id", parcelController.updateParcel);

router.delete("/deleteParcel/:id", parcelController.deleteParcel);

export default router;
