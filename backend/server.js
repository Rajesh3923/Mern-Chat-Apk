import express from "express";
import dotenv from "dotenv"; // Import dotenv module

import authRoutes from "./routes/auth.routes.js"; // importing routes
import messageRoutes from "./routes/message.routes.js"; // importing routes
import userRoutes from "./routes/user.routes.js"; // importing routes
import {app, server} from "./socket/socket.js";

import connectToMongoDB from "./db/connectToMongoDB.js"; // importing connection to MongoDB

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000
import cookieParser from "cookie-parser";

// Rest of your code remains the same

// app.get("/", function (req, res) {
//   // defining routes
//   res.send("Server is ready.........");
// });
app.use(express.json()); // Express middleware to parse incoming requests with JSON payloads(req.body)
app.use(cookieParser()); // before accesing below routes ,it verifies the user logged or not

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
