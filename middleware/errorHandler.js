export const notFound = (req, res, next) => {
  next({ status: 404, message: "Route not found" });
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.status ?? 500;
  const message = err.message ?? "Internal Server Error";
  res.status(status).json({ error: message });
};

