const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); // ✅ server only

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

export default globalErrorHandler;