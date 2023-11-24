import mongoose from "mongoose";
import { DATABASE_URL } from "../const";

async function connect() {
  const db = mongoose.connection;
  mongoose.connect(DATABASE_URL);
  db.on("error", console.error.bind(console, "Connection error from mongo"));
  db.once("open", () => {
    console.log("connect to MongoDB successfully");
  });
}

export default connect;
