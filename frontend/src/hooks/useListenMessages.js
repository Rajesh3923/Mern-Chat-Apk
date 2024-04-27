import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    // this runs when dependency items change
    socket?.on("newMessage", (newMessage) => {
      //   newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
  //Inside the useEffect hook, which runs when socket, setMessages, or messages change,
  // the logic for listening to new messages and updating the message state is implemented.
};
export default useListenMessages;
