// routes/issuesRoute.js
import express from "express";
import {
  getAllIssues,
  createIssue,
  getIssueById,
  updateIssue,
  deleteIssue,
} from "../controllers/issuesController.js";

const router = express.Router();

router.route("/").get(getAllIssues).post(createIssue);

router.route("/:id").get(getIssueById).patch(updateIssue).delete(deleteIssue);

export default router;
