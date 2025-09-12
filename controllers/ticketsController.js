// controllers/ticketsController.js
import { tickets } from "../data/tickets.js";
import { issues } from "../data/issues.js";

// helper: find price based on issue + (optionally) device
function resolvePrice(issueName, deviceName) {
  const wantedIssue = String(issueName).trim().toUpperCase();
  const wantedDevice = String(deviceName || "")
    .trim()
    .toUpperCase();

  // prefer an exact models match if your issues DB ever becomes model-specific,
  // otherwise fall back to "ALL"
  const precise =
    issues.find(
      (i) =>
        String(i.issue).trim().toUpperCase() === wantedIssue &&
        String(i.models).trim().toUpperCase() === wantedDevice
    ) || null;

  if (precise) return precise.price;

  const allMatch = issues.find(
    (i) =>
      String(i.issue).trim().toUpperCase() === wantedIssue && i.models === "ALL"
  );
  return allMatch ? allMatch.price : null;
}

export const getAllTickets = (req, res) => {
  res.json(tickets);
};

export const getTicketById = (req, res) => {
  const id = Number(req.params.id);
  const t = tickets.find((x) => x.ticketId === id);
  if (!t) return res.status(404).json({ error: "Ticket not found" });
  res.json(t);
};

export const createTicket = (req, res) => {
  let { fullName, phoneNumber, email, brandName, device, issue } = req.body;

  if (!fullName || !phoneNumber || !email || !brandName || !device || !issue) {
    return res
      .status(400)
      .json({
        error:
          "fullName, phoneNumber, email, brandName, device, and issue are required",
      });
  }

  const normalized = {
    fullName: String(fullName).trim().toUpperCase(),
    phoneNumber: String(phoneNumber).trim(),
    email: String(email).trim().toLowerCase(),
    brandName: String(brandName).trim().toUpperCase(),
    device: String(device).trim().toUpperCase(),
    issue: String(issue).trim().toUpperCase(),
  };

  const price = resolvePrice(normalized.issue, normalized.device);
  if (price == null) {
    return res
      .status(400)
      .json({ error: "Unknown issue; cannot resolve price" });
  }

  const nextId =
    tickets.reduce((m, t) => Math.max(m, Number(t.ticketId) || 0), 0) + 1;

  const newTicket = {
    ticketId: nextId,
    fullName: normalized.fullName,
    phoneNumber: normalized.phoneNumber,
    email: normalized.email,
    brandName: normalized.brandName,
    device: normalized.device,
    issue: normalized.issue,
    price,
  };

  tickets.push(newTicket);
  res.status(201).json(newTicket);
};

export const updateTicket = (req, res) => {
  const id = Number(req.params.id);
  let t = tickets.find((x) => x.ticketId === id);
  if (!t) return res.status(404).json({ error: "Ticket not found" });

  // allow partial updates; normalize when provided
  const { fullName, phoneNumber, email, brandName, device, issue } =
    req.body ?? {};

  if (fullName != null) t.fullName = String(fullName).trim().toUpperCase();
  if (phoneNumber != null) t.phoneNumber = String(phoneNumber).trim();
  if (email != null) t.email = String(email).trim().toLowerCase();
  if (brandName != null) t.brandName = String(brandName).trim().toUpperCase();
  if (device != null) t.device = String(device).trim().toUpperCase();
  if (issue != null) t.issue = String(issue).trim().toUpperCase();

  // recalc price if issue or device changed
  if (issue != null || device != null) {
    const price = resolvePrice(t.issue, t.device);
    if (price == null)
      return res
        .status(400)
        .json({ error: "Unknown issue; cannot resolve price" });
    t.price = price;
  }

  res.status(200).json({ message: "Ticket updated", updated: t });
};

export const deleteTicket = (req, res) => {
  const id = Number(req.params.id);
  const index = tickets.findIndex((x) => x.ticketId === id);
  if (index === -1) return res.status(404).json({ error: "Ticket not found" });

  const deleted = tickets.splice(index, 1);
  res.json({ message: "Ticket deleted", deleted: deleted[0] });
};
