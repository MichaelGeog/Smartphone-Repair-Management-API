
import express from "express";
import {
  getAllTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketsController.js";

const router = express.Router();

router.route("/").get(getAllTickets).post(createTicket);

router
  .route("/:id")
  .get(getTicketById)
  .patch(updateTicket)
  .delete(deleteTicket);

export default router;
