import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // actually it's params.id ,but id decoded at {id:receiverId}
    const senderId = req.user._id; // extracting the senderId from the req.user
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      // if no convos left, just create a new convo
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId: senderId, // Set senderId here
      receiverId: receiverId,
      message: message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // below line iss for saving into the database parallely
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO COMES HERE
    //retrive the receiver id from the getReceiverSocketId
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);//so a new event continuously listens bn curr user and receiver 
    }

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong at messages(requested side)",
      error: error.message,
    });
  }
};

//get messages module....

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //not a reference but actual msg
    if (!conversation) {
      return res.status(200).json({ message: "Conversation not found" });
    }
    const message = conversation.messages;
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching messages",
      error: error.message,
    });
  }
};

