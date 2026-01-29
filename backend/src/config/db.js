import mongoose from "mongoose";
let mongodInstance = null;

async function startInMemoryMongoIfNeeded() {
  if (process.env.USE_IN_MEMORY_DB !== "true") return null;
  try {
    // Lazy-load to avoid requiring this in production
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri(process.env.DATABASE_NAME || "vedaverse");
    mongodInstance = mongod;
    console.log("⚠️  Using in-memory MongoDB at", uri);
    return uri;
  } catch (err) {
    console.error("Failed to start in-memory MongoDB:", err);
    throw err;
  }
}

const connectDB = async () => {
  try {
    let uri;

    if (process.env.USE_IN_MEMORY_DB === "true") {
      uri = await startInMemoryMongoIfNeeded();
    } else {
      uri = `${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`;
    }

    const maxRetries = 5;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await mongoose.connect(uri);
        console.log("✅ MongoDB Connected");
        return;
      } catch (err) {
        console.error(
          `MongoDB connect attempt ${attempt} failed:`,
          err.message,
        );
        if (attempt === maxRetries) throw err;
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Attempt graceful shutdown of in-memory mongod when process exits
process.on("exit", async () => {
  if (mongodInstance) {
    try {
      await mongodInstance.stop();
    } catch (e) {
      // ignore
    }
  }
});

export default connectDB;
