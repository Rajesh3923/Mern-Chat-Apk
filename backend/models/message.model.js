import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // timestamp:{
    //     type:Date,
    //     default:Date.now()
    // }
  },
  { timestamps: true }
);
const Message = new mongoose.model("Message", messageSchema);
export default Message;
