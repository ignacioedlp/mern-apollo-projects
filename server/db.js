import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB);
    mongoose.connection.once("open", () => {
      console.log(`Connected to database ${mongoose.connection.name} 🚀!`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
