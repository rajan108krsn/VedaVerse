import mongoose from "mongoose";

const bhaktaSchema = new mongoose.Schema(
  {
    // 🔹 Basic Identity
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    deity: {
      type: String,
      required: true, // Krishna / Ram / Vishnu / Shiva
    },

    // 🔹 Birth & Origin
    placeOfBirth: {
      type: String,
    },

    birthYear: {
      type: String, // exact year na ho to string
    },

    era: {
      type: String, // Bhakti Kaal / Dwapar Yug
    },

    // 🔹 Main Charitra
    lifeStory: {
      type: String,
      required: true, // full bhakt charitra
    },

    // 🔹 Teachings / Gyaan
    teachings: [
      {
        type: String,
      },
    ],

    // 🔹 Famous incidents / leelas
    famousEvents: [
      {
        type: String,
      },
    ],

    // 🔹 Bhakt Image
    image: {
      type: String, // Cloudinary URL
      required: true,
    },

    // 🔹 Admin info
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔒 Admin-only content → auto verified
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bhakta", bhaktaSchema);
