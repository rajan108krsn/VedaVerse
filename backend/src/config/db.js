import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = `${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`;
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;                      
