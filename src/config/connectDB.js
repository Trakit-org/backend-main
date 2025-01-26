import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);

    mongoose.set("debug", process.env.NODE_ENV !== "production");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
