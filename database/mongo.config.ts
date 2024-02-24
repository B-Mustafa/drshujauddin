import mongoose from "mongoose";

export function connect() {
  // Check if a connection is already established
  if (mongoose.connection.readyState >=  1) {
    console.log("Mongoose already connected");
    return;
  }

  // Connection options
  const options = {
    tls: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS:  5000, // Timeout for server selection
  };

  // Attempt to connect
  mongoose.connect(process.env.MONGODB_URL as string, options)
    .then(() => console.log("Mongoose connected successfully"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

  // Global error handler
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}