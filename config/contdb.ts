import "dotenv/config";
import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL!).then(console.log);
}
