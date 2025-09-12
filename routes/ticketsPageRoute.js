// routes/ticketsPageRoute.js
import express from "express";
import { brands } from "../data/brands.js";
import { apple } from "../data/apple.js";
import { issues } from "../data/issues.js";
import { tickets } from "../data/tickets.js";

const router = express.Router();

// Server-render the page. Supports same query filters you added for tickets.
router.get("/tickets", (req, res) => {
  const { email, device, issue, brand, phone } = req.query;
  let result = tickets;

  if (email) {
    const norm = String(email).trim().toLowerCase();
    result = result.filter((t) => String(t.email).toLowerCase() === norm);
  }
  if (brand) {
    const norm = String(brand).trim().toUpperCase();
    result = result.filter((t) =>
      String(t.brandName).toUpperCase().includes(norm)
    );
  }
  if (device) {
    const norm = String(device).trim().toUpperCase();
    result = result.filter((t) =>
      String(t.device).toUpperCase().includes(norm)
    );
  }
  if (issue) {
    const norm = String(issue).trim().toUpperCase();
    result = result.filter((t) => String(t.issue).toUpperCase().includes(norm));
  }
  if (phone) {
    const norm = String(phone).trim();
    result = result.filter((t) => String(t.phoneNumber).includes(norm));
  }

  res.render("tickets", {
    brands,
    apple, // devices for APPLE (you can add others later)
    issues,
    tickets: result,
  });
});

export default router;
