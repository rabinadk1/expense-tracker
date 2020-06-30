import path from "path";
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";

import TransactionRouter from "./routes/transactions";
import connectDB from "./config/db";

const result = config({ path: "config.env" });

//if (result.error) throw result.error;

connectDB();

const app = express();

// Parses the body of json
app.use(express.json());

app.use("/transactions", TransactionRouter);

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else {
  const clientBuildFolder = path.resolve("client", "build");
  // Serving static files from build directory
  app.use(express.static(clientBuildFolder));

  // All urls expect the ones registered above will serve index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, clientBuildFolder, "index.html"))
  );
}
const PORT = parseInt(process.env.PORT || "4242");

app.listen(PORT, () =>
  console.log(
    `Listening on port ${PORT} in ${process.env.NODE_ENV} environment`
  )
);
