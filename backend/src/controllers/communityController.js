import CommunityPost from "../models/Discussion.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import catchAsync from "../middlewares/catchAsync.js";

/**
 * CREATE POST
 */
export const createPost = catchAsync(async (req, res) => {
  const { content } = req.body || {};

  if (!content) {
    throw new ApiError(400, "Post content is required");
  }

  const post = await CommunityPost.create({
    content,
    createdBy: req.user.id,
  });

  return res.status(201).json(
    new ApiResponse(201, "Post created", post)
  );
});

/**
 * GET ALL POSTS (FEED)
 */
export const getAllPosts = catchAsync(async (req, res) => {
  const posts = await CommunityPost.find()
    .populate("createdBy", "name")
    .populate("comments.user", "name")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, "Community feed fetched", posts)
  );
});

/**
 * LIKE / UNLIKE POST
 */
export const toggleLike = catchAsync(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const userId = req.user.id;
  const index = post.likes.indexOf(userId);

  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes.splice(index, 1);
  }

  await post.save();

  return res.status(200).json(
    new ApiResponse(200, "Like status updated", {
      likesCount: post.likes.length,
    })
  );
});

/**
 * ADD COMMENT
 */
export const addComment = catchAsync(async (req, res) => {
  const { text } = req.body || {};
  const post = await CommunityPost.findById(req.params.id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (!text) {
    throw new ApiError(400, "Comment text required");
  }

  post.comments.push({
    user: req.user.id,
    text,
  });

  await post.save();

  return res.status(200).json(
    new ApiResponse(200, "Comment added", post.comments)
  );
});
