import { issues } from "../data/issues.js";
const appleBrandId = "AE";

export const getAllIssues = (req, res) => {
  res.json(issues);
};

export const getIssueById = (req, res) => {
  const id = Number(req.params.id);
  const item = issues.find((i) => i.issueId === id);
  if (!item) return res.status(404).json({ error: "Issue not found" });
  res.json(item);
};

export const createIssue = (req, res) => {
  let { models, issue, price } = req.body;

  if (!models || !issue || price == null) {
    return res
      .status(400)
      .json({ error: "models, issue, and price are required" });
  }

  const normalizedModels = String(models).trim().toUpperCase();
  const normalizedIssue = String(issue).trim().toUpperCase();
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return res
      .status(400)
      .json({ error: "price must be a non-negative number" });
  }

  const duplicate = issues.find(
    (i) =>
      i.models.trim().toUpperCase() === normalizedModels &&
      i.issue.trim().toUpperCase() === normalizedIssue
  );
  if (duplicate)
    return res
      .status(409)
      .json({ error: "Issue already exists for these models" });

  const nextId =
    issues.reduce((m, i) => Math.max(m, Number(i.issueId) || 0), 0) + 1;

  const newIssue = {
    issueId: nextId,
    brandId: appleBrandId,
    models: normalizedModels,
    issue: normalizedIssue,
    price: numericPrice,
  };

  issues.push(newIssue);
  res.status(201).json(newIssue);
};

export const updateIssue = (req, res) => {
  const id = Number(req.params.id);
  let { models, issue, price } = req.body;

  const item = issues.find((i) => i.issueId === id);
  if (!item) return res.status(404).json({ error: "Issue not found" });

  const normalizedModels =
    models != null ? String(models).trim().toUpperCase() : item.models;
  const normalizedIssue =
    issue != null ? String(issue).trim().toUpperCase() : item.issue;
  const numericPrice = price != null ? Number(price) : item.price;

  if (price != null && (Number.isNaN(numericPrice) || numericPrice < 0)) {
    return res
      .status(400)
      .json({ error: "price must be a non-negative number" });
  }

  const duplicate = issues.find(
    (i) =>
      i.issueId !== id &&
      i.models.trim().toUpperCase() === normalizedModels &&
      i.issue.trim().toUpperCase() === normalizedIssue
  );
  if (duplicate)
    return res
      .status(409)
      .json({ error: "Issue already exists for these models" });

  item.models = normalizedModels;
  item.issue = normalizedIssue;
  item.price = numericPrice;

  res.status(200).json({ message: "Issue updated", updated: item });
};

export const deleteIssue = (req, res) => {
  const id = Number(req.params.id);
  const index = issues.findIndex((i) => i.issueId === id);
  if (index === -1) return res.status(404).json({ error: "Issue not found" });

  const deleted = issues.splice(index, 1);
  res.json({ message: "Issue deleted", deleted: deleted[0] });
};
