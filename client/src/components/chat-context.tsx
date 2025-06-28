import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../lib/socket";
import type { Message } from "../types/message";

type ChatContextType = {
  isConnected: boolean;
  isWaiting: boolean;
  isMatched: boolean;
  isDisconnected: boolean;
  messages: Message[];
  sendMessage: (message: string) => void;
  leaveRoom: () => void;
  findMatch: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.connect();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    const onWaiting = () => setIsWaiting(true);
    const onMatched = () => {
      setIsWaiting(false);
      setIsMatched(true);
    };
    const onMessage = (message: Message) =>
      setMessages((prev) => [...prev, message]);
    const onDisconnected = () => {
      setIsDisconnected(true);
      setIsMatched(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("waiting", onWaiting);
    socket.on("matched", onMatched);
    socket.on("message", onMessage);
    socket.on("disconnected", onDisconnected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("waiting", onWaiting);
      socket.off("matched", onMatched);
      socket.off("message", onMessage);
      socket.off("disconnected", onDisconnected);
      socket.disconnect();
    };
  }, []);

  const findMatch = () => {
    setMessages([]);
    // setIsDisconnected(false);
    // setIsMatched(false);
    socket.emit("find");
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    socket.emit("message", { message });
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: socket.id, message },
    ]);
  };

  const leaveRoom = () => {
    socket.emit("leave");
    setIsMatched(false);
    setIsWaiting(false);
    setIsDisconnected(false);
    setIsMatched(false);
  };

  return (
    <ChatContext.Provider
      value={{
        isConnected,
        isWaiting,
        isMatched,
        isDisconnected,
        messages,
        findMatch,
        sendMessage,
        leaveRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
};
