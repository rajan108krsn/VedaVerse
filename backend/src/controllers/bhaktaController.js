import catchAsync from "../middlewares/catchAsync.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Bhakta from "../models/Bhakta.js";

export const createBhakta = catchAsync(async (req, res) => {

  const {
    name,
    deity,
    placeOfBirth,
    birthYear,
    era,
    lifeStory,
    teachings,
    famousEvents,
    image,   // 👈 URL from JSON
  } = req.body || {};

  if (!name || !deity || !lifeStory || !image) {
    throw new ApiError(400, "Required fields missing (including image URL)");
  }

  const bhakta = await Bhakta.create({
    name,
    deity,
    placeOfBirth,
    birthYear,
    era,
    lifeStory,
    teachings,
    famousEvents,
    image, // 👈 direct URL
    createdBy: req.user.id,
    isVerified: true,
  });

  return res.status(201).json(
    new ApiResponse(201, "Bhakt charitra created successfully", bhakta)
  );
});


export const getAllBhaktas = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

//   User sirf search de sakta hai, lekin backend ko safe, fast aur scalable banane ke liye page aur limit zaroori hote hain.

  const skip = (page - 1) * limit;

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { deity: { $regex: search, $options: "i" } },
          { era: { $regex: search, $options: "i" } },
        ],
      }
    : {};

// Regex partial + flexible search karta hai, aur $or multiple fields me se kisi ek match pe data return karwata hai.
  const total = await Bhakta.countDocuments(query);

  const bhaktas = await Bhakta.find(query)
    .select("-__v")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json(
    new ApiResponse(200, "Bhakt charitra list fetched", {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      bhaktas,
    })
  );
});



export const getSingleBhakta = catchAsync(async (req, res) => {
  const bhakta = await Bhakta.findById(req.params.id).select("-__v");

  if (!bhakta) {
    throw new ApiError(404, "Bhakt not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Bhakt charitra fetched", bhakta)
  );
});


export const updateBhakta = catchAsync(async (req, res) => {
  const bhakta = await Bhakta.findById(req.params.id);

  if (!bhakta) {
    throw new ApiError(404, "Bhakt not found");
  }

  // Allowed fields only (security best practice)
  const allowedFields = [
    "name",
    "deity",
    "placeOfBirth",
    "birthYear",
    "era",
    "lifeStory",
    "teachings",
    "famousEvents",
    "image",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      bhakta[field] = req.body[field];
    }
  });

  await bhakta.save();

  return res.status(200).json(
    new ApiResponse(200, "Bhakt charitra updated successfully", bhakta)
  );
});


export const deleteBhakta = catchAsync(async (req, res) => {
  const bhakta = await Bhakta.findById(req.params.id);

  if (!bhakta) {
    throw new ApiError(404, "Bhakt not found");
  }

  await bhakta.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, "Bhakt charitra deleted successfully")
  );
});


