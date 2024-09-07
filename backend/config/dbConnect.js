import mongoose from "mongoose";

export const connectDatabase = () => {
  let DB_URI = "";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    DB_URI = process.env.DB_LOCAL_URI;
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    DB_URI = process.env.DB_URI;
  }

  if (!DB_URI) {
    console.error("Database URI not set. Please check your environment variables.");
    process.exit(1); // Exit process with failure
  }

  mongoose
    .connect(DB_URI)
    .then((con) => {
      console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch((err) => {
      console.error(`Error connecting to MongoDB: ${err.message}`);
      process.exit(1); // Exit process with failure
    });
};
