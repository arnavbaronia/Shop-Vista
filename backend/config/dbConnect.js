import mongoose from "mongoose";

export const connectDatabase = () => {
  let DB_URI = process.env.DB_LOCAL_URI;

  if (process.env.NODE_ENV === "PRODUCTION") {
    DB_URI = process.env.DB_URI;
  }

  mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((con) => {
      console.log(`MongoDB server connected with HOST: ${con.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
};
