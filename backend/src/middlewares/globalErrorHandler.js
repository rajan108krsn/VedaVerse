const globalErrorHandler = (err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);

  // 🔥 Mongo duplicate key error (ALL CASES)
  if (
    err.code === 11000 ||
    err.name === "MongoServerError"
  ) {
    const field = err.keyValue
      ? Object.keys(err.keyValue)[0]
      : "field";

    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Custom API error
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Fallback
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default globalErrorHandler;
