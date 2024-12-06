
// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import savingsRoutes from "./routes/savings.js"; // Import savings routes (with .js extension)
// import convertTo12 from "./routes/convertTime.js";
// dotenv.config(); // Load environment variables

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// const MONGODB_URI = process.env.MONGODB_URI;
// mongoose
//   .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error.message);
//     process.exit(1); // Exit server on connection failure
//   });

// // Routes
// app.use("/api/savings", savingsRoutes); // Prefix all savings routes with /api/savings

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import savingsRoutes from "./routes/savings/index.js"; // Updated import to the new index file

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for PORT or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit server on connection failure
  });

// Routes
app.use("/api/savings", savingsRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


