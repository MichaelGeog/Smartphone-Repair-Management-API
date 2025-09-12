import express from "express";
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import brandsRoute from "./routes/brandsRoute.js";
import appleRoute from "./routes/appleRoute.js";
import issuesRoute from "./routes/issuesRoute.js";
import ticketsRoute from "./routes/ticketsRoute.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use("/api/brands/apple/issues", issuesRoute);
app.use("/api/brands/apple", appleRoute);
app.use("/api/brands", brandsRoute);
app.use("/api/tickets", ticketsRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
