import mongoose from "mongoose";

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: [
    {
    type: String, // Cloudinary image URL
    required: true,
    }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);



export default mongoose.model("Temple", templeSchema);
