import cloudinary from "../utils/cloudinary.js";
import { getPublicIdFromUrl } from "../utils/cloudinaryHelper.js";
import Temple from "../models/Temple.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import catchAsync from "../middlewares/catchAsync.js";


export const createTemple = catchAsync(async (req, res) => {
  const { name, location, description } = req.body;

  if (!name || !location) {
    throw new ApiError(400, "Name and location are required");
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "At least one image is required");
  }

  // Upload all images to Cloudinary
  const imageUploadPromises = req.files.map((file) =>
    cloudinary.uploader.upload(file.path, {
      folder: "vedaverse/temples",
    })
  );

  const uploadResults = await Promise.all(imageUploadPromises);

  const imageUrls = uploadResults.map((img) => img.secure_url);

  const temple = await Temple.create({
    name,
    location,
    description,
    images: imageUrls,
    createdBy: req.user.id,
  });

  return res.status(201).json(
    new ApiResponse(201, "Temple created successfully", {
      temple,
    })
  );
});

export const getAllTemples = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  const skip = (page - 1) * limit;

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const totalTemples = await Temple.countDocuments(query);

  const temples = await Temple.find(query)
    .populate("createdBy", "name role") // 👈 SAFE populate
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");

  return res.status(200).json(
    new ApiResponse(200, "Temples fetched successfully", {
      page,
      limit,
      totalPages: Math.ceil(totalTemples / limit),
      totalResults: totalTemples,
      temples,
    })
  );
});

export const getMyTemples = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalTemples = await Temple.countDocuments({ createdBy: userId });

  const temples = await Temple.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");

  return res.status(200).json(
    new ApiResponse(200, "My temples fetched successfully", {
      page,
      limit,
      totalPages: Math.ceil(totalTemples / limit),
      totalResults: totalTemples,
      temples,
    })
  );
});


// GET SINGLE TEMPLE BY ID
export const getTempleById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const temple = await Temple.findById(id).select("-__v");

  if (!temple) {
    throw new ApiError(404, "Temple not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Temple fetched successfully", {
      temple,
    })
  );
});


export const updateTemple = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, location, description } = req.body;

  const temple = await Temple.findById(id);
  if (!temple) {
    throw new ApiError(404, "Temple not found");
  }

  // ownership check
if (
  temple.createdBy.toString() !== req.user.id &&
  req.user.role !== "admin"
) {
  throw new ApiError(403, "You are not allowed to modify this temple");
}

  // 1️⃣ Update text fields if provided
  if (name) temple.name = name;
  if (location) temple.location = location;
  if (description) temple.description = description;

  // 2️⃣ Upload new images (if any)
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "vedaverse/temples",
      })
    );

    const uploadResults = await Promise.all(uploadPromises);
    const newImageUrls = uploadResults.map((img) => img.secure_url);

    // append new images
    temple.images.push(...newImageUrls);
  }

  await temple.save();

  return res.status(200).json(
    new ApiResponse(200, "Temple updated successfully", {
      temple,
    })
  );
});


export const deleteTemple = catchAsync(async (req, res) => {
  const { id } = req.params;

  const temple = await Temple.findById(id);
  if (!temple) {
    throw new ApiError(404, "Temple not found");
  }
      // ownership check
if (
  temple.createdBy.toString() !== req.user.id &&
  req.user.role !== "admin"
) {
  throw new ApiError(403, "You are not allowed to modify this temple");
}
  // 🔥 Delete images from Cloudinary
  for (const imageUrl of temple.images) {
    const publicId = getPublicIdFromUrl(imageUrl);
    await cloudinary.uploader.destroy(publicId);
  }

  // Delete temple from DB
  await temple.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, "Temple deleted successfully")
  );
});


export const deleteTempleImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.query;
 console.log(imageUrl)
  if (!imageUrl) {
    throw new ApiError(400, "Image URL is required");
  }

  const temple = await Temple.findById(id);
  if (!temple) {
    throw new ApiError(404, "Temple not found");
  }
  console.log(temple)

  // Check image exists in temple
  if (!temple.images.includes(imageUrl)) {
    throw new ApiError(400, "Image not found in this temple");
  }

  // 🔥 Delete from Cloudinary
  const publicId = getPublicIdFromUrl(imageUrl);
  await cloudinary.uploader.destroy(publicId);

  // Remove image from DB
  temple.images = temple.images.filter((img) => img !== imageUrl);
  await temple.save();

  return res.status(200).json(
    new ApiResponse(200, "Temple image deleted successfully", {
      images: temple.images,
    })
  );
});
