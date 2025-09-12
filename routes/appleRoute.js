import express from "express";
import {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../controllers/appleController.js";

const router = express.Router();

router.route("/").get(getAllDevices).post(createDevice);

router
  .route("/:id")
  .get(getDeviceById)
  .patch(updateDevice)
  .delete(deleteDevice);

export default router;
