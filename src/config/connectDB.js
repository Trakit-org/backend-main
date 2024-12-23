import mongooose from "mongoose";

const connectDB = (url) => {
  return mongooose.connect(url);
};

export default connectDB;
