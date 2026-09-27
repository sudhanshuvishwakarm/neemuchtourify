import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

// Cache the connection across hot-reloads (dev) and across every request in
// prod. Without this, a new connection can be opened on each request, which
// exhausts the MongoDB connection pool under load.
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  // Already connected — reuse it.
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error(
      "MONGODB_URL environment variable is not defined. Set it in your .env / PM2 ecosystem file."
    );
  }

  // Reuse an in-flight connection attempt instead of starting a new one.
  if (!cached.promise) {
    const opts = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URL, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB connected successfully.");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset so the next request can retry instead of being stuck on a
    // rejected promise. NEVER process.exit here — that would kill the whole
    // process on a transient DB blip.
    cached.promise = null;
    console.error("MongoDB connection failed:", error?.message || error);
    throw error;
  }

  return cached.conn;
};

// Keep the cache honest if the connection drops so the next request reconnects.
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected.");
  if (cached) {
    cached.conn = null;
    cached.promise = null;
  }
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err?.message || err);
});
