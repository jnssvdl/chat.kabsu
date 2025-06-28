import React, { useState } from "react";
import { socket } from "../lib/socket";
import type { Message } from "../types/message";

export default function ChatForm({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("message", { message });
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: socket.id, message },
    ]);
    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
