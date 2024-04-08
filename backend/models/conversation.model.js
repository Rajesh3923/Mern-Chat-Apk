
// Import mongoose library for interacting with MongoDB
import mongoose from "mongoose";

// Define a schema for conversations using mongoose
const conversationSchema = new mongoose.Schema(
  {
    // Define participants field as an array of ObjectIds referencing the User model
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to the User model
      },
    ],
    // Define messages field as an array of ObjectIds referencing the Message model, with a default value of an empty array
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message", // Refers to the Message model
        default: [],
      },
    ],
  },
  // Define options for the schema, including adding timestamps for createdAt and updatedAt
  { timestamps: true }
);

// Create a mongoose model for Conversation based on the conversationSchema
const Conversation = mongoose.model("Conversation", conversationSchema);

// Export the Conversation model to be used in other parts of the application
export default Conversation;
