import React from "react";
import { socket } from "../lib/socket";
import type { Message } from "../types/message";

export default function FindMatch({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const findMatch = () => {
    setMessages([]);
    socket.emit("find");
  };

  return <button onClick={findMatch}>Find a Match</button>;
}
