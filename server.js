import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import brandsRoute from "./routes/brandsRoute.js";
import appleRoute from "./routes/appleRoute.js";
import issuesRoute from "./routes/issuesRoute.js";
import ticketsRoute from "./routes/ticketsRoute.js";
import ticketsPageRoute from "./routes/ticketsPageRoute.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/brands/apple/issues", issuesRoute);
app.use("/api/brands/apple", appleRoute);
app.use("/api/brands", brandsRoute);
app.use("/api/tickets", ticketsRoute);

app.use("/", ticketsPageRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("views =>", path.join(__dirname, "views"));
  console.log("public =>", path.join(__dirname, "public"));
});
