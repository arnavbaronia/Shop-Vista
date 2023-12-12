import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import productRoutes from "./routes/products.js";
import errorMiddleware from "./middlewares/errors.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/order.js";

dotenv.config({ path: "backend/config/config.env" });

const app = express();

connectDatabase();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

process.on("unhandledRejection", (err)=>{
  console.log(`ERROR: ${err}`);
  console.log("Shutting down serverdue to Unhandled Promis Rejection");
  server.close(()=>{
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});