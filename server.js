import express from "express";
import brandsRoute from "./routes/brandsRoute.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/brands", brandsRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
