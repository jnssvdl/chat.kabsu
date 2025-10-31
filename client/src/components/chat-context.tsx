import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket-context";
import type { Message } from "../types/message";

type ChatContextType = {
  isWaiting: boolean;
  isMatched: boolean;
  isDisconnected: boolean;
  isTyping: boolean;
  messages: Message[];
  sendMessage: (message: string) => void;
  leaveRoom: () => void;
  findMatch: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocket();

  const [isWaiting, setIsWaiting] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const onWaiting = () => setIsWaiting(true);
    const onMatched = () => {
      setIsWaiting(false);
      setIsMatched(true);
      setIsDisconnected(false);
    };
    const onDisconnected = () => {
      setIsMatched(false);
      setIsDisconnected(true);
      setIsTyping(false);
    };
    const onTyping = ({ typing }: { typing: boolean }) => setIsTyping(typing);
    const onMessage = (message: Message) =>
      setMessages((prev) => [...prev, message]);

    socket.on("waiting", onWaiting);
    socket.on("matched", onMatched);
    socket.on("disconnected", onDisconnected);
    socket.on("typing", onTyping);
    socket.on("message", onMessage);

    return () => {
      socket.off("waiting", onWaiting);
      socket.off("matched", onMatched);
      socket.off("disconnected", onDisconnected);
      socket.off("typing", onTyping);
      socket.off("message", onMessage);
    };
  }, [socket]);

  const findMatch = () => {
    setMessages([]);
    setIsMatched(false);
    setIsDisconnected(false);
    setIsWaiting(true);
    socket.emit("find");
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    socket.emit("message", { message });
    setMessages((prev) => [...prev, { from: socket.id, message }]);
  };

  const leaveRoom = () => {
    socket.emit("leave");
    setIsWaiting(false);
    setIsMatched(false);
    setIsDisconnected(false);
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        isWaiting,
        isMatched,
        isDisconnected,
        isTyping,
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
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
